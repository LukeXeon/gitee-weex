export default function openUrl(url) {
  if (url) {
    let navigator = weex.requireModule('navigator');
    navigator.push(url)
  }
}
