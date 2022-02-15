import { Pipe, PipeTransform } from '@angular/core';

export function assetUrl(url: string): string {
  // @ts-ignore
  const publicPath = __webpack_public_path__;
  const publicPathSuffix = publicPath.endsWith('/') ? '' : '/';
  const urlPrefix = url.startsWith('/') ? '' : '/';

  return `${publicPath}${publicPathSuffix}assets${urlPrefix}${url}`;
}

@Pipe({ name: 'assetUrl' })
export class AssetUrlPipe implements PipeTransform {

  transform(value: string): string {
    return assetUrl(value);
  }
}