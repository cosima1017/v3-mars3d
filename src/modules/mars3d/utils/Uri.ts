/**
 * @license
 *
 * Grauw URI utilities
 *
 * See: http://hg.grauw.nl/grauw-lib/file/tip/src/uri.js
 *
 * @author Laurens Holst (http://www.grauw.nl/)
 *
 *   Copyright 2012 Laurens Holst
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */

interface IURI {
  scheme: string | null
  authority: string | null
  path: string
  query: string | null
  fragment: string | null
  getScheme(): string | null
  getAuthority(): string | null
  getPath(): string
  getQuery(): string | null
  getFragment(): string | null
  isAbsolute(): boolean
  isSameDocumentAs(uri: IURI): boolean
  equals(uri: IURI): boolean
  normalize(): void
  resolve(baseURI: IURI): IURI
  toString(): string
}

/**
 * Constructs a URI object.
 * @constructor
 * @class Implementation of URI parsing and base URI resolving algorithm in RFC 3986.
 * @param {string|IURI} uri A string or URI object to create the object from.
 */
class URI implements IURI {
  public scheme: string | null = null
  public authority: string | null = null
  public path: string = ''
  public query: string | null = null
  public fragment: string | null = null

  constructor(uri?: string | IURI) {
    if (uri instanceof URI) {
      // copy constructor
      this.scheme = uri.scheme
      this.authority = uri.authority
      this.path = uri.path
      this.query = uri.query
      this.fragment = uri.fragment
    } else if (uri) {
      // uri is URI string or cast to string
      const uriString = typeof uri === 'string' ? uri : uri.toString()
      const c = parseRegex.exec(uriString)
      if (c) {
        this.scheme = c[1] || null
        this.authority = c[2] || null
        this.path = c[3] || ''
        this.query = c[4] || null
        this.fragment = c[5] || null
      }
    }
  }

  /**
   * Returns the scheme part of the URI.
   * In "http://example.com:80/a/b?x#y" this is "http".
   */
  public getScheme(): string | null {
    return this.scheme
  }

  /**
   * Returns the authority part of the URI.
   * In "http://example.com:80/a/b?x#y" this is "example.com:80".
   */
  public getAuthority(): string | null {
    return this.authority
  }

  /**
   * Returns the path part of the URI.
   * In "http://example.com:80/a/b?x#y" this is "/a/b".
   * In "mailto:mike@example.com" this is "mike@example.com".
   */
  public getPath(): string {
    return this.path
  }

  /**
   * Returns the query part of the URI.
   * In "http://example.com:80/a/b?x#y" this is "x".
   */
  public getQuery(): string | null {
    return this.query
  }

  /**
   * Returns the fragment part of the URI.
   * In "http://example.com:80/a/b?x#y" this is "y".
   */
  public getFragment(): string | null {
    return this.fragment
  }

  /**
   * Tests whether the URI is an absolute URI.
   * See RFC 3986 section 4.3.
   */
  public isAbsolute(): boolean {
    return !!this.scheme && !this.fragment
  }

  /**
   * Tests whether the URI is a same-document reference.
   * See RFC 3986 section 4.4.
   *
   * To perform more thorough comparison, you can normalise the URI objects.
   */
  public isSameDocumentAs(uri: IURI): boolean {
    return (
      uri.scheme === this.scheme &&
      uri.authority === this.authority &&
      uri.path === this.path &&
      uri.query === this.query
    )
  }

  /**
   * Simple String Comparison of two URIs.
   * See RFC 3986 section 6.2.1.
   *
   * To perform more thorough comparison, you can normalise the URI objects.
   */
  public equals(uri: IURI): boolean {
    return this.isSameDocumentAs(uri) && uri.fragment === this.fragment
  }

  /**
   * Normalizes the URI using syntax-based normalization.
   * This includes case normalization, percent-encoding normalization and path segment normalization.
   * XXX: Percent-encoding normalization does not escape characters that need to be escaped.
   *      (Although that would not be a valid URI in the first place. See validate().)
   * See RFC 3986 section 6.2.2.
   */
  public normalize(): void {
    this.removeDotSegments()
    if (this.scheme) this.scheme = this.scheme.toLowerCase()
    if (this.authority)
      this.authority = this.authority
        .replace(authorityRegex, replaceAuthority)
        .replace(caseRegex, replaceCase)
    if (this.path) this.path = this.path.replace(caseRegex, replaceCase)
    if (this.query) this.query = this.query.replace(caseRegex, replaceCase)
    if (this.fragment) this.fragment = this.fragment.replace(caseRegex, replaceCase)
  }

  /**
   * Resolve a relative URI (this) against a base URI.
   * The base URI must be an absolute URI.
   * See RFC 3986 section 5.2
   */
  public resolve(baseURI: IURI): IURI {
    const uri = new URI()
    if (this.scheme) {
      uri.scheme = this.scheme
      uri.authority = this.authority
      uri.path = this.path
      uri.query = this.query
    } else {
      uri.scheme = baseURI.scheme
      if (this.authority) {
        uri.authority = this.authority
        uri.path = this.path
        uri.query = this.query
      } else {
        uri.authority = baseURI.authority
        if (this.path === '') {
          uri.path = baseURI.path
          uri.query = this.query || baseURI.query
        } else {
          if (this.path.charAt(0) === '/') {
            uri.path = this.path
            uri.removeDotSegments()
          } else {
            if (baseURI.authority && baseURI.path === '') {
              uri.path = '/' + this.path
            } else {
              uri.path = baseURI.path.substring(0, baseURI.path.lastIndexOf('/') + 1) + this.path
            }
            uri.removeDotSegments()
          }
          uri.query = this.query
        }
      }
    }
    uri.fragment = this.fragment
    return uri
  }

  /**
   * Remove dot segments from path.
   * See RFC 3986 section 5.2.4
   * @private
   */
  private removeDotSegments(): void {
    const input = this.path.split('/')
    const output: string[] = []
    let segment: string | undefined
    const absPath = input[0] === ''

    if (absPath) input.shift()
    // const sFirst = input[0] === '' ? input.shift() : null

    while (input.length) {
      segment = input.shift()
      if (segment === '..') {
        output.pop()
      } else if (segment !== '.') {
        output.push(segment as string)
      }
    }

    if (segment === '.' || segment === '..') output.push('')
    if (absPath) output.unshift('')
    this.path = output.join('/')
  }

  /**
   * Serialises the URI to a string.
   */
  public toString(): string {
    let result = ''
    if (this.scheme) result += this.scheme + ':'
    if (this.authority) result += '//' + this.authority
    result += this.path
    if (this.query) result += '?' + this.query
    if (this.fragment) result += '#' + this.fragment
    return result
  }
}

// Regular expression from RFC 3986 appendix B
const parseRegex = new RegExp('^(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*)(?:\\?([^#]*))?(?:#(.*))?$')
const caseRegex = /%[0-9a-z]{2}/gi
const percentRegex = /[a-zA-Z0-9\-\._~]/
const authorityRegex = /(.*@)?([^@:]*)(:.*)?/

function replaceCase(str: string): string {
  const dec = unescape(str)
  return percentRegex.test(dec) ? dec : str.toUpperCase()
}

function replaceAuthority(
  str: string,
  p1: string | undefined,
  p2: string,
  p3: string | undefined
): string {
  return (p1 || '') + p2.toLowerCase() + (p3 || '')
}

export default URI
