import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth';
import { editUser, getSingleUser } from '../api/userData';

function RegisterForm({ user, updateUser }) {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    profileImageUrl: '',
    username: '',
    bio: '',
    uid: user.uid,
  };
  const [formData, setFormData] = useState(initialState);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (user.uid) {
      getSingleUser(id).then((userObj) => {
        setFormData((prevState) => ({
          ...prevState,
          id: userObj.id,
          firstName: userObj.first_name,
          lastName: userObj.last_name,
          email: userObj.email,
          username: userObj.username,
          profileImageUrl: userObj.profile_image_url,
          bio: userObj.bio,
        }));
      });
    }
  }, [user, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      const collector = {
        id: formData.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        userName: formData.username,
        profileImageUrl: formData.profileImageUrl,
        bio: formData.bio,
        uid: user.uid,
      };
      editUser(collector, user.uid).then(() => router.push('/'));
    } else {
      registerUser(formData).then(() => updateUser(user.uid));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control as="textarea" name="firstName" required value={formData.firstName} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Last Name</Form.Label>
        <Form.Control as="textarea" name="lastName" required value={formData.lastName} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control as="textarea" name="username" required value={formData.username} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" name="email" required value={formData.email} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Bio</Form.Label>
        <Form.Control as="textarea" name="bio" required value={formData.bio} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control type="url" name="profileImageUrl" required value={formData.profileImageUrl} onChange={handleChange} />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
  updateUser: PropTypes.func,
};

RegisterForm.defaultProps = {
  updateUser: () => {},
};

export default RegisterForm;
