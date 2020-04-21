import React, { Fragment, useState, useEffect } from 'react';
import { Heading, Columns, Image } from 'react-bulma-components';
import styled from 'styled-components';
import ArtistsService from '../../services/artists';
import { useParams } from 'react-router-dom';
import Album from '../common/album';
import Musics from '../musics';
import Favorite from '../common/favorite';

const DivVSpaced = styled.div`
 margin-top: 20px;
 margin-bottom: 20px;
`

const Artists = () => {
  let { id } = useParams();
  const [artist, setArtist] = useState([]);
  const [albums, setAlbums] = useState([]);

  async function fetchArtist() {
    const response = await ArtistsService.show(id);
    setArtist(response.data);
    var albuns = response.data['albums'];
    setAlbums(albuns.map((album, key) =>
            <Columns.Column desktop={{ size: 3 }} mobile={{ size: 6 }} key={key}>
                <Album artist_name={album.artist_name} title={album.title} cover_url={album.cover_url} id={album.id} />
            </Columns.Column>
    ));
  }
  
  
      
  useEffect(() => {
    console.log("useEfect");
    fetchArtist();
  }, []);


  return (
    <Fragment>
      <Columns className='is-vcentered is-mobile is-centered'>
        <Columns.Column desktop={{ size: 3 }} className='has-text-centered'>
          <Image src={artist.photo_url} />
          <DivVSpaced>
            <Heading size={5} className='has-text-white'>{artist.name}</Heading>
          </DivVSpaced>
        </Columns.Column>
      </Columns>
      <Columns className="columns is-mobile is-multiline">
            {albums}
        </Columns>
    </Fragment>
  );
}
export default Artists;