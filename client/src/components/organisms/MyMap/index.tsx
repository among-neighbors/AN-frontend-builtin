import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { connect } from 'react-redux';
import { closeMap, MapState, RootState } from '~/others/store';
import { useRef } from 'react';
import { Box } from '@mui/material';
import React from 'react';
import { StyledMap } from './styled';
import SquareImg from '~/components/atoms/Img';
import styled from 'styled-components';

const StyledImg2 = styled.img`
  height: 20px;
  width: 20px;
`;

interface Props {
  mapState: MapState;
}

const MyMap: React.FC<Props> = (props) => {
  const { mapState } = props;
  const { isOpen, pos } = mapState;
  const mapRef = useRef<kakao.maps.Map>(null);

  const levelUp = () => {
    const map = mapRef.current;
    if (!map) return;
    const nowLevel = map.getLevel();
    map.setLevel(nowLevel - 1);
  };

  const levelDown = () => {
    const map = mapRef.current;
    if (!map) return;
    const nowLevel = map.getLevel();
    map.setLevel(nowLevel + 1);
  };

  return (
    <>
      {isOpen && (
        <Box sx={{ mt: '10px' }}>
          <StyledMap>
            {pos && (
              <Map
                center={pos}
                ref={mapRef}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <MapMarker position={pos} />
              </Map>
            )}

            <div className={'back'}>
              <button onClick={closeMap}>
                <SquareImg src={'../../../../public/img/back.png'} />
              </button>
            </div>
            <div className={'services'}>
              <button onClick={levelUp}>
                <StyledImg2 src={'../../../../public/img/plus.svg'} />
              </button>
              <button onClick={levelDown}>
                <StyledImg2 src={'../../../../public/img/minus.svg'} />
              </button>
            </div>
          </StyledMap>
        </Box>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    mapState: state.mapReducer,
  };
};

export default connect(mapStateToProps)(MyMap);
