import ClipboardJS from 'clipboard';

export function initClipboard() {
  const clipboard = new ClipboardJS('.copy-btn');
  clipboard.on('success', e=>{console.log('Copied:',e.text); e.clearSelection();});
  clipboard.on('error', e=>{console.error('Clipboard error');});
}
