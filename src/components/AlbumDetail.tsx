import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Photo } from './PreviewPhotos';

export default function AlbumDetail() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // `https://jsonplaceholder.typicode.com/photos?albumId=${id}`;

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    (async function () {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${id}`,
        { signal }
      );
      const data = (await res.json()) as Photo[];
      console.log('🚀  data:', data);

      setPhotos(data);
    })();

    return () => controller.abort();
  }, []);

  return (
    <>
      <div className='border border-blue-600'>
        <div>여기는 상세 앨범 페이지 입니다: id = {id}</div>
        <div className='flex flex-wrap'>
          {photos.map((photo) => (
            <img
              key={photo.id}
              src={photo.thumbnailUrl}
              alt={photo.title}
            ></img>
          ))}
        </div>
        <button className='bg-red-400' onClick={() => navigate('/')}>
          목록으로
        </button>
      </div>
    </>
  );
}
