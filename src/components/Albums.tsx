import { useEffect, useRef, useState } from 'react';
import { useSession } from '../contexts/session-context';
import PreviewPhotos, { Photo } from './PreviewPhotos';
import clsx from 'clsx';

const LIMIT = 3;

type Album = {
  userId: number;
  id: number;
  title: string;
  photos: Photo[];
};

export type Preview = {
  id: number;
  title: string;
  photos: Photo[];
};

// type Albums = {

// };

export default function Albums() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const idRef = useRef<number>();
  const [curPreview, setCurPreview] = useState<Preview | null>(null);

  console.log('🚀  Albums  Albums:', 'Albums');

  const {
    session: { loginUser },
  } = useSession();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    loginUser &&
      (async function () {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/albums?userId=${loginUser.id}`,
          { signal }
        );
        const data = (await res.json()) as Album[];

        const urls = data.map(
          (e) =>
            `https://jsonplaceholder.typicode.com/photos?albumId=${e.id}&_limit=${LIMIT}`
        );
        const requests = urls.map((url) => fetch(url, { signal }));
        await Promise.all(requests)
          .then((responses) => Promise.all(responses.map((r) => r.json())))
          .then((results) => {
            results.map((element, idx) => {
              data[idx].photos = element;
            });
          });

        setAlbums(data);
        console.log('🚀  data:', data);

        !curPreview &&
          setCurPreview({
            id: data[0].id,
            title: data[0].title,
            photos: data[0].photos,
          });
        console.log('dddddddddddddddd', curPreview);
      })();

    return () => controller.abort();
  }, [loginUser]);

  return (
    <>
      <div className='flex flex-row'>
        <ul className='border border-sky-400 rounded-l text-start size-1/2'>
          {albums.map((album) => (
            <li
              key={album.id}
              className={clsx(
                'border',
                'border-emerald-400',
                curPreview?.id == album.id && 'bg-orange-400'
              )}
            >
              <button
                className='size-full text-start hover:bg-red-400'
                onClick={() => {
                  setCurPreview({ ...album });
                }}
              >
                #{album.id}: {album.title}
              </button>
            </li>
          ))}
        </ul>
        <div className='border border-black size-1/2'>
          Preview
          <PreviewPhotos preview={curPreview} />
        </div>
      </div>
    </>
  );
}

// function AlbumList() {
//   return (
//     <>
//       <li className='border border-emerald-400'>
//         <button
//           className='size-full text-start hover:bg-red-400'
//           onClick={() => {
//             setCurPreview({ ...album });
//           }}
//         >
//           #{album.id} :{album.title}
//         </button>
//       </li>
//     </>
//   );
// }
