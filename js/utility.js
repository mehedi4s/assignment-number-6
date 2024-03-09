function getElementById(elementId) {
  const element = document.getElementById(elementId);
  const elementText = element.innerText;
  const value = parseInt(elementText);
  return value;
}
function setElementByValue(elementId, value) {
  const element = document.getElementById(elementId);
  element.innerText = value;
}
