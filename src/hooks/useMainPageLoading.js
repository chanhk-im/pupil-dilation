import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShowList } from '../features/show/slices/showSlice';
import { getShowsDocument } from '../features/show/api/showsDocumentApi';
import { ref, getDownloadURL } from 'firebase/storage';
import { fStorage } from '../Firebase';
import { markAsDownloadImage } from '../features/show/slices/showSlice';

export default function useMainPageLoading() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const showList = useSelector((state) => state.show.showList);

    async function getShows() {
        await getShowsDocument().then((value) => {
            dispatch(fetchShowList(value));
            setIsLoaded(true);
        });
    }

    const getImageUrl = async (storageUrl) => {
        let downloadUrl;
        const imageRef = ref(fStorage, storageUrl);
        await getDownloadURL(imageRef).then((url) => {
            downloadUrl = url;
        });
        return downloadUrl;
    };

    useEffect(() => {
        getShows().then(() => {
            showList.forEach((element, index) => {
                getImageUrl(element.image).then((url) => {
                    dispatch(markAsDownloadImage({ index, url }));
                });
            });
        });
    }, []);

    return [isLoaded, setIsLoaded, getShows];
}
