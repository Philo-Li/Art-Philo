/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PhotoDetailsModal from './PhotoDetailsModal';
import SaveToCollectionsModal from './SaveToCollectionsModal';
import '../index.css';

// eslint-disable-next-line react/prefer-stateless-function
const PhotoCard = ({ photo, allCollections, setAllCollections, likeSinglePhoto }) => {
  if (!photo) return null;

  return (
    <div>
      <Card key={photo.id}>
        <Card.Img src={photo.small} alt="Card image" />
        <Card.ImgOverlay className="sm">
          <div className="wrapper">
            <div id={photo.id} className="button-0">
              <Button variant="light" onClick={() => window.open(photo.downloadPage)}>
                <i className="bi bi-download" />
              </Button>
            </div>
            <div className="button-0">
              <SaveToCollectionsModal
                photo={photo}
                allCollections={allCollections}
                setAllCollections={setAllCollections}
              />
            </div>
            <div className="button-0">
              <Button variant="light" onClick={() => likeSinglePhoto(photo)}>
                {!photo.isLiked && (<i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />)}
                {photo.isLiked && (
                  <div className="red-icon">
                    <i className={photo.isLiked ? 'bi bi-heart-fill' : 'bi bi-heart'} />
                  </div>
                )}
              </Button>
            </div>
            <div className="button-0">
              <PhotoDetailsModal
                photo={photo}
                allCollections={allCollections}
                setAllcollections={setAllCollections}
                likeSinglePhoto={likeSinglePhoto}
              />
            </div>
          </div>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
};

export default PhotoCard;
