import ReactQuill from "react-quill";
import { useState } from "react";
import 'react-quill/dist/quill.snow.css';


const Editor = () => {
    const [value,setValue] = useState("");
    console.log(value);
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
    }
    
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]
    
  return (
    <div>
        <ReactQuill theme="snow" formats={formats} modules={modules}></ReactQuill>
    </div>
  )
}

export default Editor