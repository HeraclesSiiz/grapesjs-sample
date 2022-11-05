import { useEffect,useState } from "react";

import grapesjs from 'grapesjs';
import basic from 'grapesjs-blocks-basic';
import bootstrap4 from 'grapesjs-blocks-bootstrap4';
// import toolbox from 'grapesjs-plugin-toolbox';
import plugin from 'grapesjs-preset-webpage';
import forms from 'grapesjs-plugin-forms';
import 'grapesjs/dist/css/grapes.min.css';
import './../../css/grapes.css';

function Grape() {
  const [editor, setEditor] = useState(0);

  function save(){
    const htmlblob = new Blob([editor.getHtml()+'<style>'+editor.getCss()+'</style>'], { type: "text/plain" });
    const htmlurl = URL.createObjectURL(htmlblob);
    const htmllink = document.createElement("a");
    htmllink.download = "index.html";
    htmllink.href = htmlurl;
    htmllink.click();
  }

 useEffect(() => {
   const editor = grapesjs.init({
     fromElement: true,
     container: '#gjs',
     storageManager: {
      type: 'local',
      autosave: true,
      storeComponents: true,
      storeStyles: true,
      storeHtml: true,
      storeCss: true,
     },
     plugins:[
        basic,forms,plugin
    ],
    
    pluginsOpts: {
      [plugin]: {
        },
    },
   });
   setEditor(editor);
 },[]);

 return (
  <>
    <button type="button"onClick={() => save()}>Save</button>
    <div id="gjs">
    </div>
  </>
 );
}

export default Grape;