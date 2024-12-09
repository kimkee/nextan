
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import '../style/CateMenu.scss';
export default function CateMenu({ menu, opts }: { menu: any[], opts: string }) {
  const params = useParams()
  const [slideActive, slideActiveSet] = useState(0);
  const cateBoxRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const goSlide = (num: number) => {
    const catebox = cateBoxRef.current;
    const btnAct = activeBtnRef.current;
    if (catebox && btnAct) {
      const cateboxWid = catebox?.offsetWidth * 0.5;
      const btnActLeft = btnAct?.offsetLeft;
      const btnActWid = btnAct?.offsetWidth * 0.5;

      const scr = btnActLeft - cateboxWid + btnActWid;
      catebox?.scrollTo(scr, 0);
      console.log("slideActive == " + slideActive + "  " + btnActLeft);
      slideActiveSet(num);
    }
  };
  const cateID = params.cate;
  useEffect(() => {
    goSlide(slideActive);
    // console.log(menu);

    return () => { }
    // eslint-disable-next-line
  }, [cateID, slideActive, menu, opts]);

  return (
    <>
      <div className={"cate-box " + cateID}>
        <div className="inr" ref={cateBoxRef}>
          {menu.length > 0 ?
            <ul className="list">
              <li data-index="0" className={"0" === cateID ? "active" : ''}>
                <button className="bt text-xs" onClick={() => router.push(`/list/${opts}/0`)} ref={cateID === "0" ? activeBtnRef : null}>전체</button>
              </li>
              {menu.map((item: { id: string; name: string; }, idx: number) => {
                return (
                  <li data-index={idx + 1} key={item.id} data-cate={item.id} className={item.id.toString() === cateID ? "active" : ''}>
                    <button
                      className="bt text-xs"
                      onClick={() => router.push(`/list/${opts}/${item.id}`)}
                      ref={item.id.toString() === cateID ? activeBtnRef : null}
                    >
                      {item.name}
                    </button>
                  </li>
                )
              })}
            </ul>
            :
            null
          }
        </div>
      </div>
    </>
  )
}