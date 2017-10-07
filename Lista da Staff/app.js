/**
 * @name Staff Widget.
 * @author Luiz {@link https://lffg.github.io/}
 * @version {beta} 1.0
 * @licence MIT
 */
(function ($, html, css) {
  'use strict';

  var config = {

    list: [
      {
        name: 'Grupo 1',
        color: '#3399cc',
        members: [
          { name: 'Membro 1', id: 1 },
          { name: 'Membro 2', id: 2 },
          { name: 'Membro 3', id: 3 }
        ]
      }, {
        name: 'Grupo 2',
        color: '#000',
        members: [
          { name: 'Membro 4', id: 4 },
          { name: 'Membro 5', id: 5 },
          { name: 'Membro 6', id: 6 },
          { name: 'Membro 7', id: 7 }
        ]
      }, {
        name: 'Grupo 3',
        color: 'red',
        members: [
          { name: 'Membro 8', id: 8 },
          { name: 'Membro 9', id: 9 },
          { name: 'Membro 10', id: 10 },
          { name: 'Membro 11', id: 11 },
          { name: 'Membro 12', id: 12 },
          { name: 'Membro 13', id: 13 },
          { name: 'Membro 14', id: 14 }
        ]
      }
    ],

    view: {
      lang: {
        title: 'Staff do Fórum'
      },

      template: $(html.join('\n'))
    },

    engine: {

      /**
       * @param {object} parent - Corresponde ao seletor pai que a lista será colocada.
       */
      init: function (parent) {

        $.each(config.list, function (index, group) {
          var $list = $('<div>', {
            'class': 'fa-list-group',
            'html' : [
              $('<span>', {
                'class': 'fa-list-group-title',
                'text': group.name
              })
                .css('background-color', group.color)
                .prop('outerHTML')
              ,
              $('<div>', { 'class': 'fa-list-append-zone' }).prop('outerHTML')
            ].join('\n')
          })
            .css('border-left-color', group.color)
          ;

          $.each(group.members, function (index, user) {
            $('<div>', {
              'class': 'fa-list-user-item',
              'html' : [
                $('<a>', { 'text': user.name, 'href': '/u' + user.id }).prop('outerHTML'),
                $('<a>', {
                  'class': 'pm-link',
                  'html': '<i class="fa fa-envelope-o"></i>',
                  'href': '/privmsg?mode=post&u=' + user.id
                }).prop('outerHTML')
              ].join('\n')
            })
              .appendTo($list.find('.fa-list-append-zone'))
            ;
          });

          $list.appendTo(config.view.template.find('.append-zone'));
        });

        $(config.view.template)
          .find('.fa-lang-title')
            .text(config.view.lang.title)
        ;

        $(parent).append(config.view.template);
        $('<style>', { 'text': css.join('\n') }).appendTo('head');

        return this;
      },

      hide: function () {
        $(config.view.template)
          .find('.staff-userlist')
            .hide()
        ;

        return this;
      },

      events: function () {
        $(document).on('click', function () {
          $(config.view.template)
            .find('.staff-userlist')
              .hide()
          ;
        });

        $(config.view.template).on('click', function (event) {
          event.stopPropagation();
        });

        $(config.view.template)
          .find('.staff-userlist-toggler')
            .on('click', function () {
              $(config.view.template)
                .find('.staff-userlist')
                  .toggle()
              ;
            })
        ;

        return this;
      }
    }
  };

  $(function () {
    config.engine.init($('body')).hide().events();
  });
}(jQuery, [
  '<div class="staff-userlist-wrapper">',
  '  <a href="javascript:void(0);" class="staff-userlist-toggler">',
  '    <i class="fa fa-user-secret"></i>',
  '  </a>',
  '  <div class="staff-userlist">',
  '    <header>',
  '      <h3 class="fa-lang-title"></h3>',
  '    </header>',
  '    <main>',
  '      <div class="append-zone">',
  '      </div>',
  '    </main>',
  '  </div>',
  '</div>'
], [
  '.fa-memberlist-wrapper { display: none; }',
  '.staff-userlist-wrapper {',
  '  position: fixed;',
  '  bottom: 0;',
  '  left: 0;',
  '  z-index: 99999;',
  '}',
  '',
  '.staff-userlist-wrapper .staff-userlist-toggler {',
  '  background-color: #39c;',
  '  width: 50px;',
  '  height: 50px;',
  '  display: -webkit-inline-box;',
  '  display: -ms-inline-flexbox;',
  '  display: inline-flex;',
  '  -webkit-box-pack: center;',
  '      -ms-flex-pack: center;',
  '          justify-content: center;',
  '  -webkit-box-align: center;',
  '      -ms-flex-align: center;',
  '          align-items: center;',
  '  border-top-right-radius: 3px;',
  '  cursor: pointer;',
  '  -webkit-transition: all 130ms linear;',
  '  transition: all 130ms linear;',
  '}',
  '',
  '.staff-userlist-wrapper .staff-userlist-toggler:hover {',
  '  background-color: #444;',
  '}',
  '',
  '.staff-userlist-wrapper .staff-userlist-toggler .fa {',
  '  color: #fff;',
  '  font-size: 30px;',
  '}',
  '',
  '.staff-userlist-wrapper .staff-userlist {',
  '  position: absolute;',
  '  bottom: 50px;',
  '  left: 0;',
  '  background-color: #fff;',
  '  width: 350px;',
  '  box-shadow: 5px 5px rgba(0, 0, 0, 0.3);',
  '  border: solid 1px #ddd;',
  '  border-left: none;',
  '  border-left: solid 0px;',
  '}',
  '',
  '.staff-userlist-wrapper .staff-userlist header {',
  '  background-color: #39c;',
  '  border-bottom: solid 1px #ddd;',
  '  padding: 13px 15px;',
  '  height: auto;',
  '  width: auto;',
  '  background-size: initial;',
  '}',
  '',
  '.staff-userlist-wrapper .staff-userlist header h3 {',
  '  margin: 0;',
  '  padding: 0;',
  '  border: none;',
  '  color: #fff;',
  '  font-family: "Trebuchet MS", "Segoe UI", "Ubuntu", "Helvetica Neue", "Helvetica", Arial, sans-serif;',
  '  font-size: 18px;',
  '  font-weight: 500;',
  '}',
  '.staff-userlist-wrapper .staff-userlist main .append-zone {',
  '  max-height: 80vh;',
  '  max-height: -moz-calc(100vh - 355px);',
  '  max-height: -webkit-calc(100vh - 355px);',
  '  max-height: -ms-calc(100vh - 355px);',
  '  max-height: -o-calc(100vh - 355px);',
  '  max-height: calc(100vh - 355px);',
  '  overflow-y: scroll;',
  '}',
  '',
  '.staff-userlist-wrapper .staff-userlist main .append-zone .fa-list-group {',
  '  border-bottom: solid 1px #ddd;',
  '}',
  '',
  '.staff-userlist-wrapper .staff-userlist main .append-zone .fa-list-group:last-child {',
  '  border-bottom: none;',
  '}',
  '',
  '.staff-userlist-wrapper .staff-userlist main .append-zone .fa-list-group .fa-list-group-title {',
  '  display: block;',
  '  font-size: 14px;',
  '  padding: 9px 15px;',
  '  color: #fff;',
  '  font-family: "Trebuchet MS", "Segoe UI", "Ubuntu", "Helvetica Neue", "Helvetica", Arial, sans-serif;',
  '  text-transform: uppercase;',
  '}',
  '',
  '.staff-userlist-wrapper .staff-userlist main .append-zone .fa-list-group .fa-list-append-zone {',
  '  padding: 10px 15px;',
  '  line-height: 20px;',
  '  font-size: 13px;',
  '}',
  '.staff-userlist-wrapper .staff-userlist main .append-zone .fa-list-group .fa-list-append-zone .fa-list-user-item {',
  '  display: block;',
  '}',
  '',
  '.staff-userlist-wrapper .staff-userlist main .append-zone .fa-list-group .fa-list-append-zone .fa-list-user-item .pm-link {',
  '  float: right;',
  '}'
]));
