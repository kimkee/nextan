'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import axios from 'axios';
import ui from '@/app/lib/ui';
import StarPoint from '@/app/components/StarPoint';
import Img from '@/app/components/Img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default  function ListSet({opts}:{opts:{media:string, list:string, cate:string, title:string }}){
  
  const [mlist, setMlist] = useState([]);
 
  const cateList = opts.cate !== '0' ? `&with_genres=${opts.cate}` : ``;
  
  const fetchMoive = ()=>{
    const fetchURL = `//api.themoviedb.org/3/${opts.list}?page=1${cateList}&language=ko&region=kr&sort_by=vote_count.desc&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;
    axios.get( fetchURL ).then(res =>{
      console.log(res.data);
      setMlist( res.data.results );
    }).catch(e=>{
      console.log(e);
    }); 
  }

  const goScroll = (els: string, e?: any) => {
    const scrollBox = scrollBoxRef.current;
    const isNext = els === 'next' ? true : false;
    if(!scrollBox) return;
    const minus = isNext ? 1 : -1;
    const scAmt = (scrollBox.offsetWidth - 100) * minus;
    console.log(scAmt, scrollBox, minus);
    scrollBox.scrollLeft += scAmt;
  };
  const scrollBoxRef = useRef<HTMLDivElement>(null);
  const [isNav, setIsNav] = useState(true);

  const handleWheel = (event: any)=> {
    event.preventDefault();
    if(scrollBoxRef.current){
      scrollBoxRef.current.scrollLeft += event.deltaY;
    }
  }
  const [isNavPrev, setIsNavPrev] = useState(false);
  const [isNavNext, setIsNavNext] = useState(false);
  const handeScroll = ()=> {
    const box = scrollBoxRef.current;
    if(!box) return;
    const amt = Math.ceil(box.scrollLeft / (box.scrollWidth - box.offsetWidth)*100 || 0);
    console.log( amt );
    setIsNavPrev( amt <= 0 ? true : false);
    setIsNavNext( amt >= 100 ? true : false);
  }
  const isNavBtn = () => {
    const el = scrollBoxRef.current;
    // console.log(el?.scrollWidth ,el?.clientWidth);
    if (!el) return;
    setIsNav(el?.scrollWidth > el?.clientWidth);
  };
  useEffect(() => {
    fetchMoive();
    // isNavBtn()
    setTimeout(() => isNavBtn(), 1000);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return(
    <>
      
      <section className="sect mnList mb-1.5">

        <div className="hbox flex justify-between items-center min-h-8 mb-1.5 leading-none px-5">
          <Link className="link inline-flex items-center" href={`/list/${opts.media}/${opts.cate || 0}`}>
            <h4 className="tts text-sm">{opts.title}</h4>
            <FontAwesomeIcon icon={['fas', 'chevron-right']} className='w-3 h-3 ml-1'/>
          </Link>
          <div className={`bt-nav ${isNav ? '' : 'hidden'}`}>
            <button type="button" disabled={isNavPrev} onClick={(e)=>goScroll('prev', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-left' ]} className='w-3 h-3' /></button>
            <button type="button" disabled={isNavNext} onClick={(e)=>goScroll('next', e)} className="bt w-4 h-4 inline-flex items-center justify-center -mx-0.5 text-white/30 hover:text-primary"><FontAwesomeIcon icon={['fas', 'caret-right']} className='w-3 h-3' /></button>
          </div>
        </div>

        <div ref={scrollBoxRef}
          className="inr flex flex-nowrap overflow-y-hidden overflow-x-auto px-3 scrollbar-hidden scroll-smooth"
          onMouseEnter={ ()=>scrollBoxRef.current?.addEventListener('wheel', handleWheel) }
          onMouseLeave={ ()=>scrollBoxRef.current?.removeEventListener('wheel', handleWheel) }
          onScroll={ handeScroll }
        >
          { mlist.filter( (item: any, i: number) => i < 20 ).map( (data: any, idx: number) => {
              const img = `https://image.tmdb.org/t/p/w154${data.poster_path}` ;
              const tit = data.title || data.name;
              return (
                <div key={idx} className="pbox box block w-[calc(24%-3%)] min-w-[calc(24%-3%)] mx-[0.4rem]  break-all">
                  <Link className="box block relative rounded-sm overflow-hidden w-full bg-black pb-[calc(450%/300*100)] mb-1"
                     href={`/list/${opts.media}/0/${data.id}`}
                  >
                    <Img width={300} height={450} src={`${img}`} alt={tit} srcerr='/img/common/non_poster.png' unoptimized={true} className='img img absolute object-cover w-full h-full'/>
                  </Link>
                </div>
              )
            })
          }
            
        </div>
      </section>
    </>
  )
}