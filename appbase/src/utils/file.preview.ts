import { message } from 'ant-design-vue';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import { isString } from './is';
import { getRandomNum } from './random';

// 预览单张图片
export function previewImg(ele: HTMLImageElement | string) {
	let targetImage: HTMLImageElement;
	if (isString(ele)) {
		targetImage = new Image();
		targetImage.src = ele;
	} else {
		targetImage = ele;
	}
	const viewer = new Viewer(
		targetImage,
		{
			// inline: true,
			// viewed() {
			//     viewer.zoomTo(1);
			// },
			// container:document.getElementsByClassName('ant-layout')[0]
		}
	);
	viewer.show();
}

// 预览多张图片
export function priviewImages(sources: string[], targetIndex = 0) {
	if (!sources || sources.length == 0) return;

	const panel = document.createElement('div');
	const tag: number = getRandomNum();
	panel.setAttribute('id', `dowebok${tag}`);
	sources.forEach(src => {
		const img = new Image();
		img.src = src;
		img.setAttribute('data-original', src);
		panel.appendChild(img);
	});
	const viewer = new Viewer(panel, {
		url: 'data-original'
	});
	viewer.show();
	targetIndex > 0 && viewer.view(targetIndex);
}

// 文件预览：图片-通过viewer,office文件-在线预览  其它-打开新标签展示
export function previewByLink(link: string) {
	if (!link) {
		message.error('文件链接错误，无法预览，请认真核对！');
		return;
	}

	// 获取文件扩展名
	const fileFype: string = link.substr(link.lastIndexOf('.') + 1, link.length);

	if (['png', 'jpg', 'jpeg'].includes(fileFype)) {


		previewImg(link);
	} else if (['docx', 'doc', 'xlsx', 'xls', 'ppt', 'pptx'].includes(fileFype)) {

		const preivewUrl = `https://viewoffice.wetax.com.cn/onlinePreview?url=${link}&officepreviewtype=${fileFype}`;
		previewFileWithNewTab(preivewUrl);
	} else {

		previewFileWithNewTab(link);
	}
}

// 打开新标签-目标URL
export function previewFileWithNewTab(url: string) {
	const a = document.createElement('a');
	const uniqueId = 'startTPreMedicine';
	a.setAttribute('href', url);
	a.setAttribute('target', '_blank');
	a.setAttribute('id', uniqueId);
	// 防止反复添加
	if (document.getElementById(uniqueId)) {
		document.body.removeChild(document.getElementById(uniqueId));
	}
	document.body.appendChild(a);
	a.click();
}
