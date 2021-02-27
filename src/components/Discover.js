/* eslint-disable react/style-prop-object */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import config from '../config';
import '../index.css';

import useCollections from '../hooks/useCollections';

const cover = 'https://png.pngtree.com/png-vector/20190120/ourlarge/pngtree-gallery-vector-icon-png-image_470660.jpg';
// eslint-disable-next-line react/prefer-stateless-function
const Discover = () => {
  const history = useHistory();
  const { collections } = useCollections({
    userId: config.pickyAdmin,
    first: 30,
  });

  if (!collections) return null;

  const allCollections = collections.edges
    ? collections.edges.map((edge) => edge.node)
    : [];

  const openCollection = () => {
    console.log('hey');
    history.push('/collection/:id');
  };

  const getCover = (collection) => (collection.photoCount === 0
    ? cover
    : collection.photos.edges[0].node.photo.small);

  return (
    <div className="p-3">
      <>
      </>
      <CardColumns className="sm my-2 my-lg-5">
        {allCollections.map((collection) => (
          <Card key={collection.id}>
            <div
              className="view zoom overlay"
              onClick={() => { openCollection(); }}
              onKeyPress={() => openCollection()}
              role="button"
              tabIndex="0"
            >
              <img
                src={getCover(collection)}
                className="max-height-100"
                alt="smaple"
              />
              <div className="mask flex-center rgba-blue-light white-text">
                <i size="lg" className="bi bi-search" />
              </div>
            </div>
            <Card.Title>
              <p className="row-item-0">{collection.title}</p>
            </Card.Title>
          </Card>
        ))}
      </CardColumns>
    </div>
  );
};

export default Discover;
