// var vendor = [
//     '/client/static/components/react/react-with-addons.min.js'
// ]
// var widget = [
//     '/client/widget/jsx/pages/index/index.jsx'
// ]
// var styles = [
//     '/client/static/less/**'
//     ,'/client/static/css/**'
// ]

fis.config.set('namespace', 'home');

// chrome下可以安装插件实现livereload功能
// https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
fis.config.set('livereload.port', 35729);

fis.config.set('deploy', {
    'dev' : {
        from: '/',
        to: '/',
        // yog2 默认的部署入口，使用调试模式启动 yog2 项目后，这个入口就会生效。IP与端口请根据实际情况调整。
        receiver: 'http://www.commonfe.com:8085/yog/upload'
    }
});
fis.config.set('roadmap.path', [{
    reg: /^\/server\/conf\/(ral\.js)$/i,
    useMap: false,
    release: '${config}/ral/${namespace}\.js'
}].concat(fis.config.get('roadmap.path', [])));
fis.config.set('project.exclude', "/client/react");
fis.config.set('project.watch.exclude', "/client/react/**");
// fis.config.set('project.fileType.text', 'jsx'); //*.jsx files are text file.
// fis.config.set('roadmap.ext.jsx', 'js');        //*.jsx are exactly treat as *.js
// // fis.config.set('modules.parser.jsx', 'react');  //compile *.jsx with fis-parser-react plugin
// // fis.config.set('settings.parser.jsx.harmony', true);
// // fis.config.set('settings.parser.jsx.es6module', true);
// // fis.config.set('settings.parser.jsx.nonStrictEs6module', true);
// // fis.config.set('project.include', ['/client/pages/**'].concat(vendor, handle, widget, styles));
// fis.config.set('modules.parser.jsx', 'babel');
// // fis.config.set('modules.parser.js', 'babel');
// fis.config.set('settings.parser.babel', {
//     optional: ["reactCompat","es6","es7"]
// });
// fis.config.set('settings.optimizer.uglify-js', {
//     mangle: {
//         except: 'exports, module, require, define'
//     }
// });
// fis.config.set('roadmap.path', [{
//     reg: /^\/client\/widget\/(.*\.jsx)$/i,
//     isMod: true,
//     id: 'widget/$1',
//     release: '${static}/${namespace}/widget/$1'
// // },{
// //     reg:'/client/widget/jsx/**',
// //     isES6: true
// // },{
// //     reg: '/client/static/**',
// //     isES6: false
// // },{
// //     reg: '/client/node_modules/**',
// //     isES6: false
// // },{
// //     reg: '/client/components/**',
// //     isES6: false
// }].concat(fis.config.get('roadmap.path', [])));
// fis.config.set('modules.packager', 'depscombine');
// fis.config.merge({
//     'pack': {
//         '/client/static/pkg/vendor.js' : vendor
//         ,'/client/static/pkg/widget.js' : widget
//         // ,'/client/static/pkg/styles.css': styles
//     }
// });