// Finished.
(function ($, css) {
  'use strict';

  var config = {
    max_length: 60000,
    min_length: 15,

    alerts: {
      success: '<i class="fa fa-check"></i> Sua mensagem foi postada com sucesso!',
      min_length: '<i class="fa fa-exclamation-triangle"></i> Sua mensagem tem menos que 15 caracteres.',
      max_length: '<i class="fa fa-exclamation-triangle"></i> Sua mensagem tem mais que 60 000 caracteres.',
      error: '<i class="fa fa-exclamation-triangle"></i> Houve um erro AJAX. Atualize a página e tente novamente.',
      loading: '<i class="fa fa-refresh fa-spin"></i> Carregando...'
    }
  };

  $(function () {
    var $alert = $('<div>', { 'class': 'alert-wrapper' }).prependTo($(this));

    $('#quick_reply')
      .prepend($alert)
      .on('submit', function (event) {

        event.preventDefault();
        var $sceditor = $('#text_editor_textarea').sceditor('instance');

        if ($sceditor.val().length > config.max_length) {
          $alert.html($('<div>', {
            'class': 'fa-alert fa-alert-warn',
            'html' : config.alerts.max_length
          }));

          return false;
        }

        if ($sceditor.val().length < config.min_length) {
          $alert.html($('<div>', {
            'class': 'fa-alert fa-alert-warn',
            'html' : config.alerts.min_length
          }));

          return false;
        }

        var data = {
          message   : $sceditor.val(),
          mode      : 'reply',
          tid       : $('[name="tid"]').val(),
          t         : location.pathname.replace(/^\/t(\d+)[p-].*$/gi, '$1'),
          attach_sig: 1,
          notify    : 1,
          post      : 1
        };

        var encode = document.charset.toLowerCase() === 'utf-8' ? window.encodeURIComponent : window.escape;

        var encoded = $.map(data, function (value, key) {
          return key + '=' + encode(value);
        }).join('&');

        $.ajax({
          url  : '/post',
          type : 'POST',
          cache: false,

          data: encoded,

          beforeSend: function () {
            $alert.html($('<div>', {
              'class': 'fa-alert fa-alert-info',
              'html' : config.alerts.loading
            }));
          },

          success: function () {
            console.log('[AJAX Reply] AJAX #1 Postado.');

            $.ajax({
              url  : location.pathname,
              type : 'GET',
              cache: false,
              data : { view: 'newest' },

              success: function (context) {
                console.log('[AJAX Reply] AJAX #2 Postado. Concluído! [OK]');

                var $post = $('.post', context).last();
                $post
                  .hide()
                    .insertAfter($('.post').last())
                      .slideDown()
                ;

                $('html, body').stop().animate({
                   scrollTop: $('.post').last().offset().top
                });

                $alert.html($('<div>', {
                  'class': 'fa-alert fa-alert-success',
                  'html' : config.alerts.success
                }));

                $sceditor.val('');
              },

              error: function () {
                $alert.html($('<div>', {
                  'class': 'fa-alert fa-alert-danger',
                  'html' : config.alerts.error
                }));
              }
            });
          },

          error: function () {
            $alert.html($('<div>', {
              'class': 'fa-alert fa-alert-danger',
              'html' : config.alerts.error
            }));
          }
        });

      })
    ;

    $('<style>', { text: css.join('\n') }).appendTo('head');
  });
}(jQuery, [
  '.alert-wrapper {',
  '  width: 70%;',
  '  margin: 0 auto;',
  '  text-align: center;',
  '  margin-bottom: 25px;',
  '  margin-top: 10px;',
  '}',
  '',
  '.fa-alert {',
  '  border: solid 1px #ddd;',
  '  background-color: #fff;',
  '  padding: 15px;',
  '  border-radius: 3px;',
  '  font-size: 13px;',
  '  color: #555;',
  '  user-select: none;',
  '}',
  '',
  '.fa-alert.fa-alert-info {',
  '  background-color: #cde6ec;',
  '  border-color: #58c2db;',
  '  color: #35a5c0;',
  '}',
  '',
  '.fa-alert.fa-alert-success {',
  '  background-color: #e3eadc;',
  '  border-color: #8b5;',
  '  color: #7bb344;',
  '}',
  '',
  '.fa-alert.fa-alert-warn {',
  '  background-color: #f2ecdb;',
  '  border-color: #eb3;',
  '  color: #e5b022;',
  '}',
  '',
  '.fa-alert.fa-alert-danger {',
  '  background-color: #f2dfdb;',
  '  border-color: #e53;',
  '  color: #e9502e;',
  '}'
]));
