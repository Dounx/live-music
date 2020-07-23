export default function flash(level, msg, delay = 0) {
  let cls = 'alert-info';
  switch (level) {
    case 'notice':
      cls = 'alert-info';
      break;
    case 'error':
      cls = 'alert-danger';
      break;
  }

  let element = $(
      '<div class="alert ' + cls + ' alert-dismissable fade show">\n' +
      '      ' + msg + '\n' +
      '      <button class="close" data-dismiss="alert">x</button>\n' +
      '    </div>');

  element.appendTo($('.flash'));

  if (delay !== 0) {
    element.delay(delay).fadeOut();
  }
}