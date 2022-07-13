import React, { Fragment, useCallback } from 'react';
import Drawer from '../../components/Drawer';
import Layout from '../../components/layout';
import Slider from '../../components/Slider';

export async function getServerSideProps(context) {
  const response = await fetch('http://localhost:9000/api/interview');
  const props = await response.json();
  return {
    props
  };
}

const Interview = props => {
  const handleSubmit = useCallback(e => {}, []);
  return (
    <Layout title="Interviews">
      <Slider carouselTitle="Interviews">
        {props.data.map(i => (
          <ul key={i.id}>
            <Drawer key={i.id} header={`${i.company} - ${i.date}`}>
              <Fragment>
                {i.retro.split('\n').map(l => (
                  <p key={l}>{l}</p>
                ))}
                <button value={i.id} onClick={handleSubmit}>
                  Update
                </button>
              </Fragment>
            </Drawer>
          </ul>
        ))}
      </Slider>
    </Layout>
  );
};

export default Interview;
