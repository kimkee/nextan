import React from 'react';
import Link from 'next/link';  // useParams , Outlet, useSearchParams, useLocation
import './ItemB.css';
// import StarPoint from '../components/StarPoint';

// Movie, TV 리스트 유닛
export default function ItemB({data, opts, cate}) {
  // console.log(data);
  
  const img = `//image.tmdb.org/t/p/w200/${data.poster_path}`;
  const tit = data.title || data.name;

  return (
  <>
    <Link className='box block relative' href={`/list/${opts}/${cate}/${data.id}`}>
      <div className="cont">
        <div className="pics">
          <img src={`${img}`} alt={tit} className='img' /* onError={ui.error.poster} *//>
        </div>
        <div className="desc">
          {/* <StarPoint point={data.vote_average} /> */}
        </div>
      </div>
      <div className="mt-1 text-xs line-clamp-1 overflow-hidden">{tit}</div>
      
    </Link>
  </>  
  )
}