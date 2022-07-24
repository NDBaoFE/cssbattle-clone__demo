import React,{useRef,useEffect} from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { htmlLanguage} from '@codemirror/lang-html';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { useState } from 'react';
 import styled from "styled-components";
 import FacebookIcon from '@mui/icons-material/Facebook';
 import { FacebookShareButton } from "react-share";


import EditorHeader from './EditorHeader';
import {DEFAULT_CODE,lastScore,highScore} from '../store/CodeMaterial'
import OutPutHeader from './OutPutHeader';
import TargetHeader from './TargetHeader';

 



function Arena() {
    const [code,setCode]=useState(DEFAULT_CODE);
    const [count,setCount]=useState(0);
    const [slideChecked, setSlideChecked] = useState( false );
    const [diffChecked,setDiffChecked]=useState(false);

    const changeSlideCheckBoxValue = () => {
      setSlideChecked(state => !state);
    }
    const changeDiffCheckBoxValue= () =>{
      setDiffChecked(state =>!state);
    }


  //ref
  const userOutPutRef = useRef();
  const imgRef = useRef();
  const outputContainerRef=useRef();
  const iframeRef=useRef();

//render everytime the codechange
    useEffect(()=>{
    
    },[code])
      


//compare output to img 
    function imageCompareSlider(e) {
      if (slideChecked) {
        userOutPutRef.current.style.cursor = "col-resize";
        iframeRef.current.style["z-index"] = "16";
        iframeRef.current.style["border-right"] = "2px solid red";
        iframeRef.current.style["border-left"] = "none";
        iframeRef.current.style.width =
          e.clientX - outputContainerRef.current.offsetLeft + "px";

      }
    }
  
    function resetWidth() {
      if (slideChecked) {
        userOutPutRef.current.style.cursor = "unset";
        iframeRef.current.style["border-right"] = "none";
        iframeRef.current.style["z-index"] = "10";
        imgRef.current.style["z-index"] = "9";
        iframeRef.current.style.width = "400px";
      }
    }
  return (
    <Container>
      <Editor>
        <EditorHeader count={count}/>
        <CodeMirror
          className='editor'
          value={code}
          height="650px"
          theme={dracula}
          extensions={[htmlLanguage]}
          onChange={(e) => {
            setCode(e);
            setCount(e.length);
          }}
        

        />
      </Editor>
      <OutPut>
            <OutPutHeader slideChecked={slideChecked} 
                          changeSlideCheckBoxValue={changeSlideCheckBoxValue}
                          diffChecked={diffChecked}
                          changeDiffCheckBoxValue={changeDiffCheckBoxValue}
                          
            ></OutPutHeader>
            <OutPutContent>
              <div
            id="output-container"
            className="output-container"
            ref={outputContainerRef}
              >
            <iframe
              id="source"
              className="iframe-output"
              width="400px"
              height="300px"
              title="output"
              style={{mixBlendMode: diffChecked? 'difference':'normal'  }}
              scrolling='no'
              ref={iframeRef}
              srcDoc={code}
            ></iframe>
            <div
              ref={userOutPutRef}
              className="output-layer"
              onMouseMove={imageCompareSlider}
              onMouseLeave={resetWidth}
            ></div>
            <div id="img-layer" className="img-layer" ref={imgRef}>
              <img
                src='https://cssbattle.dev/targets/1.png'
                width="400px"
                height="300px"
                alt="level1"
              />
            </div>
              </div>
              <div className='inner-header'>
                <h4 className='header_title header__title--inner'>Your Score</h4>
                <div className='score-container'>
                    <div>
                      <p className='score-container__score-type'>Last Score:</p>
                      <p className='score-container__score'>{lastScore}</p>
                    </div>
                    <div>
                      <p className='score-container__score-high-type'>High Score:</p>
                      <p className='score-container__score'>{highScore}</p>
                    </div>
                    <div className='button-container'>
                        <div className='share-button'>
                        <FacebookShareButton
        url={"https://cssbattle.dev/"}
        quote={"helu"}
        hashtag={["#fcode","rode_battle"]}
        description={"aiueo"}
        className="Demo__some-network__share-button"
      >
        <FacebookIcon></FacebookIcon>
                          <p>Challange</p>
      </FacebookShareButton>
            
                      
                        </div>
                    </div>
                </div>

              </div>
        </OutPutContent>
        </OutPut>
      <Target>
        <TargetHeader></TargetHeader>
        <TargetContent>
      <img src='https://cssbattle.dev/targets/1.png' className='target_img'/>
      <div className='inner-header'>
                <h4 className='header_title header__title--inner'>Colors to use</h4>
                <ul className='colors-list '>
                    
                </ul>
      </div>
      </TargetContent>
      </Target>
    </Container>
  )
}

export default Arena
const Container =styled.div`
display:flex`
const Editor=styled.div`
min-width:27.5rem;
max-width:100%;
min-height: calc(100vh - 8rem);
`
const Target=styled.div`
width: 440px;
max-width:100vw;
min-height: calc(100vh - 8rem);
height:100vh;
 img{
  width:400px;
  height:300px;
 }`
 const OutPut=styled.div`
 min-width: 440px;
max-width:100%;
min-height: calc(100vh - 8rem);
`

const OutPutContent=styled.div`
background:#171d23;
width:100%;
height:100%;
display:flex;
flex-direction:column;
align-items:center;`

const TargetContent=styled(OutPutContent)`

`