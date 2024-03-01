import { useNavigate } from 'react-router-dom';
import { Preview } from './Albums';
// import { useNavigate } from 'react-router-dom';

export type Photo = {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

type Props = {
  preview: Preview | null;
};

//https://jsonplaceholder.typicode.com/photos?albumId=1&_limit=5

export default function PreviewPhotos({ preview }: Props) {
  console.log('🚀  PreviewPhotos  PreviewPhotos:', preview);

  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/albums/${preview?.id}`);
  };

  return (
    <>
      {!preview ? (
        <div>미리보기가 없습니다. 좌측 앨범을 선택해주세요</div>
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
          <button
            className='m-3 p-3 bg-blue-600 rounded-md hover:bg-blue-300'
            onClick={() => goToDetail()}
          >
            더보기
          </button>
        </div>
      )}
    </>
  );
}
