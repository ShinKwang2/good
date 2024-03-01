import { useEffect, useState } from 'react';
import { Preview } from './Albums';

export type Photo = {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

type Props = {
  preview: Preview;
};

//https://jsonplaceholder.typicode.com/photos?albumId=1&_limit=5

export default function PreviewPhotos({ preview }: Props) {
  console.log('🚀  PreviewPhotos  PreviewPhotos:', 'PreviewPhotos');

  // const [photos, setPhotos] = useState<Photo[]>([]);
  // console.log(albumId);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const { signal } = controller;
  //   console.log('fffffffffffff');

  //   (async function () {
  //     const res = await fetch(
  //       `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&_limit=${limit}`,
  //       { signal }
  //     );
  //     console.log('🚀  res:', res);
  //     const data = (await res.json()) as Photo[];
  //     console.log('🚀  data:', data);
  //     setPhotos(data);
  //   })();

  //   return () => controller.abort();
  // }, []);

  return (
    <>
      {!preview ? (
        <div>미리보기가 없습니다</div>
      ) : (
        <div>
          <div className='text-xl'>
            #{preview.id}: {preview.title}
          </div>
          <div className='flex justify-center p-5 gap-2'>
            {preview.photos.map((photo) => (
              <img
                key={photo.id}
                src={photo.thumbnailUrl}
                className='size-1/4'
              />
            ))}
          </div>
          <button className='m-3 p-3 bg-blue-600 rounded-md hover:bg-blue-300'>
            더보기
          </button>
        </div>
      )}
      {/* {photos.map((photo) => (
        <div>
          {photo.id}: {photo.title}{' '}
          <div>
            {photo.url} / {photo.thumbnailUrl}
          </div>
        </div>
      ))} */}
      {/* {preview?.albumId} + {preview?.phothos} */}
      {/* <div className='text-2xl'>{albumId}</div>
      <div className='flex justify-center p-5 gap-2'>
        {photos.map((photo) => (
          <img src={photo.thumbnailUrl} className='size-1/4' />
        ))}
      </div>
      <button className='m-3 p-3 bg-blue-600 rounded-md hover:bg-blue-300'>
        더보기
      </button> */}
    </>
  );
}
