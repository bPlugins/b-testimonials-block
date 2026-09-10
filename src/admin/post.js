import './post.scss';

window.copyBPlAdminShortcode = id => {
    var input = document.querySelector('#bPlAdminShortcode-' + id + ' input');
    var tooltip = document.querySelector('#bPlAdminShortcode-' + id + ' .tooltip');
    input.select();
    input.setSelectionRange(0, 30);
    document.execCommand('copy');
    tooltip.innerHTML = wp.i18n.__('Copied Successfully!', 'b-testimonials-block');
    setTimeout(() => {
        tooltip.innerHTML = wp.i18n.__('Copy To Clipboard', 'b-testimonials-block');
    }, 1500);
}
