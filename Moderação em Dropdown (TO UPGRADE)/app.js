// To upgrade.
(function ($, css) {
  'use strict';

  $(function () {
    var _modes = [
      { 'name': 'Deletar', 'mode': 'delete' },
      { 'name': 'Enviar à lixeira', 'mode': 'trash' },
      { 'name': 'Mover', 'mode': 'move' },
      { 'name': 'Bloquear', 'mode': 'lock' },
      { 'name': 'Desbloquear', 'mode': 'unlock' },
    ];

    var _tid = $('[name="tid"]:first').val();

    var $drop = $('<div>', { 'class': 'fa-mod-dropdown' });

    $.each(_modes, function () {
      $('<a>', {
        'data-mode': this.mode,
        'text': this.name
      }).appendTo($drop);
    });

    $drop
      .hide()
      .on('click', function (event) {
        event.stopPropagation();
      })
      .appendTo('body')
    ;

    $(document).on('click', function () {
      $drop.hide();
    });

    $('.topics .row').each(function () {
      var $this = $(this);

      $this.css('position', 'relative');

      var _id   = $this
        .find('.topictitle')
        .attr('href')
        .replace(/^\/t(\d+).*$/gi, '$1')
      ;

      $('<a>', {
        'class': 'fa fa-cog fa-mod-dropdown-toggler',
        'data-id': _id,
        'href': 'javascript:void(0);',
        'style': [
          'font-size: 13px;',
          'margin-right: 4.5px;'
        ].join(' ')
      }).insertBefore($this.find('.topictitle'));

      $this.on('click', '.fa-mod-dropdown-toggler', function (event) {
        event.stopPropagation();

        var $link = $(this);

        if ($drop.css('display') !== 'none') {
          $drop.hide();

          return;
        }

        $drop
          .find('[data-mode="delete"]')
          .attr('href', '/modcp?mode=delete&t=' + _id + '&tid=' + _tid)
        .end()
          .find('[data-mode="trash"]')
          .attr('href', '/modcp?mode=trash&t=' + _id + '&tid=' + _tid)
        .end()
          .find('[data-mode="move"]')
          .attr('href', '/modcp?mode=move&t=' + _id + '&tid=' + _tid)
        .end()
          .find('[data-mode="lock"]')
          .attr('href', '/modcp?mode=lock&t=' + _id + '&tid=' + _tid)
        .end()
          .find('[data-mode="unlock"]')
          .attr('href', '/modcp?mode=unlock&t=' + _id + '&tid=' + _tid)
        ;

        $drop
          .css({
            'position': 'absolute',
            'top': $link.offset().top + 'px',
            'left': $link.offset().left + 'px',
            'margin-top': $link.height() + 15 + 'px'
          })
          .append($('<span>', {
            'class': 'before',
            'style': 'left: ' + 15 - ($link.width() / 2) + 'px;'
          }))
          .show()
        ;
      });
    });

    $('<style>', { 'text': css.join('\n') }).appendTo('head');
  });
}(jQuery, [
  '.fa-mod-dropdown {',
  '  background-color: #fff;',
  '  padding: 6px 0;',
  '  width: 140px;',
  '  border: solid 1px #bbb;',
  '  margin-left: -15px;',
  '  border-radius: 2px;',
  '  position: absolute;',
  '  z-index: 9999;',
  '}',
  '',
  '.fa-mod-dropdown > .before {',
  '  content: "";',
  '  width: 15px;',
    'border-bottom-right-radius: 100px;',
  '  height: 15px;',
  '  position: absolute;',
  '  top: -9px;',
  '  left: calc(15px - 4.5px);',
  '  background-color: #fff;',
  '  transform: rotate(45deg);',
  '  border-top: solid 1px #bbb;',
  '  border-left: solid 1px #bbb;',
  '}',
  '',
  '.fa-mod-dropdown > a {',
  '  display: block;',
  '  padding: 10px;',
  '  color: #555;',
  '  cursor: pointer;',
  '  font-size: 11px;',
  '}',
  '',
  '.fa-mod-dropdown > a:hover {',
  '  background-color: #bbb;',
  '  color: #fff;',
  '}'
]));
