import { Link } from 'react-router-dom';
import { useAppSelector } from 'Hooks/useAppSelector';
import { Stack, Button, Typography } from '@mui/material';
import { BookmarkAdd as BookmarkAddIcon } from '@mui/icons-material';
import { ViewHeading } from 'Components/Common/ViewHeading';
import { ErrorView } from 'Components/Common/ErrorView';
import { BookmarksSearch } from 'Components/Bookmarks/BookmarksSearch/BookmarksSearch';
import { BookmarkItem } from 'Components/Bookmarks/BookmarkItem';
import { BoxStyled } from 'Components/Common/BoxStyled';
import { InfoBox } from 'Components/Common/InfoBox';

export const BookmarksView = () => {
  const { bookmarks, error } = useAppSelector((state) => state.bookmarks);

  if (error) return <ErrorView>Error occurred while loading bookmarks</ErrorView>;

  return (
    <>
      <ViewHeading>Bookmarks</ViewHeading>
      {bookmarks.length > 0 ? (
        <>
          <BookmarksSearch />
          <BoxStyled>
            <Link to="/bookmarks/add">
              <Button variant="contained" color="success" size="small" endIcon={<BookmarkAddIcon />}>
                Add Bookmark
              </Button>
            </Link>
          </BoxStyled>
          <Stack spacing={4}>
            {bookmarks.map((bookmark) => (
              <BookmarkItem key={bookmark.id} bookmark={bookmark} />
            ))}
          </Stack>
        </>
      ) : (
        <InfoBox severity="info">
          <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
            No bookmarks found. Add you first bookmark!
          </Typography>
          <Link to="/bookmarks/add">
            <Button variant="contained" color="success" size="small" endIcon={<BookmarkAddIcon />}>
              Add Bookmark
            </Button>
          </Link>
        </InfoBox>
      )}
    </>
  );
};
