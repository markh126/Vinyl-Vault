/* eslint-disable react/forbid-prop-types */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createRecord, editRecord, getSingleRecord } from '../api/recordData';
import getGenres from '../api/genreData';

const initialState = {
  name: '',
  recordImageUrl: '',
  artist: '',
  trackList: '',
  releaseDate: '',
};

const RecordForm = ({ obj }) => {
  const [currentRecord, setCurrentRecord] = useState(initialState);
  const [genres, setGenres] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getGenres().then(setGenres);
    if (obj.id) {
      getSingleRecord(id).then((recordObj) => {
        setCurrentRecord((prevState) => ({
          ...prevState,
          id: recordObj.id,
          name: recordObj.name,
          recordImageUrl: recordObj.record_image_url,
          artist: recordObj.artist,
          trackList: recordObj.track_list,
          genre: recordObj.genre.id,
          releaseDate: recordObj.release_date,
        }));
      });
    }
  }, [obj, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentRecord.id) {
      const record = {
        id: currentRecord.id,
        name: currentRecord.name,
        recordImageUrl: currentRecord.recordImageUrl,
        artist: currentRecord.artist,
        trackList: currentRecord.trackList,
        genre: currentRecord.genre,
        releaseDate: currentRecord.releaseDate,
        userId: user.id,
      };
      editRecord(record, user.uid).then(() => router.push('/users/collection'));
    } else {
      const product = {
        id: currentRecord.id,
        name: currentRecord.name,
        recordImageUrl: currentRecord.recordImageUrl,
        artist: currentRecord.artist,
        trackList: currentRecord.trackList,
        genre: currentRecord.genre,
        releaseDate: currentRecord.releaseDate,
        userId: user.id,
      };
      createRecord(product, user.uid).then(() => router.push('/users/collection'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" type="text" required value={currentRecord.name} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Record Image Url</Form.Label>
          <Form.Control name="recordImageUrl" type="url" required value={currentRecord.recordImageUrl} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Artist</Form.Label>
          <Form.Control name="artist" type="text" required value={currentRecord.artist} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Track List</Form.Label>
          <Form.Control name="trackList" type="textarea" required value={currentRecord.trackList} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Release Date</Form.Label>
          <Form.Control name="releaseDate" required value={currentRecord.releaseDate} onChange={handleChange} />
        </Form.Group>

        <FloatingLabel controlId="floatingSelect" label="Genre">
          <Form.Select
            aria-label="Genre"
            name="genre"
            onChange={handleChange}
            className="mb-3"
            value={currentRecord.genre}
            required
          >
            <option value="">Select a Genre</option>
            {genres?.map((genre) => (
              <option key={genre.label} value={genre.id}>
                {genre.label}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

RecordForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    recordImageUrl: PropTypes.string,
    artist: PropTypes.string,
    trackList: PropTypes.string,
    genre: PropTypes.object,
    releaseDate: PropTypes.string,
  }),
};

RecordForm.defaultProps = {
  obj: initialState,
};

export default RecordForm;
