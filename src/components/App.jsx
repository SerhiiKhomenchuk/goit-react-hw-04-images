import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import { getImgs } from './utilites/getImgs';
import { Loader } from './Loader/Loader';
import { useState } from 'react';
import { useEffect } from 'react';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState(STATUS.IDLE);
  const [data, setData] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!searchText) {
      return;
    }
    (async () => {
      try {
        setStatus(STATUS.PENDING);

        const { totalImages, images } = await getImgs(searchText, page);

        if (totalImages === 0) {
          setStatus(STATUS.REJECTED);
          setError(
            'Nothing was found for your request. Please change your request'
          );
          return;
        }

        setData(prevState => [...prevState, ...images]);
        setTotalImages(totalImages);
        setStatus(STATUS.RESOLVED);
      } catch (error) {
        console.log('error in APP', `${error}`);
        setError(`${error}`);
        setStatus(STATUS.REJECTED);
      }
    })();
  }, [page, searchText]);

  const handleSearch = nextSearchText => {
    if (nextSearchText === '') {
      setError('Please fill in the search field');
      setStatus(STATUS.REJECTED);
    } else if (searchText !== nextSearchText) {
      setSearchText(nextSearchText);
      setPage(1);
      setData([]);
      setTotalImages(0);
    }
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <>
        <Searchbar handleSearch={handleSearch} />

        <ImageGallery
          images={data}
          status={status}
          error={error}
          loadMore={() => onLoadMore}
          totalImages={totalImages}
        />
        {status === 'pending' && <Loader />}
      </>
    </div>
  );
};

export default App;
