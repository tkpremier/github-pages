import { DriveDbSlider } from '../../../src/components/model/Slider';
import handleResponse from '../../../src/utils/handleResponse';

const getModel = async (id: string) => {
  try {
    const response = await handleResponse(
      await fetch(`${process.env.INTERNAL_API_URL}/api/model/${id}`, { credentials: 'include' })
    );
    return response;
  } catch (error) {
    console.error('Model error: ', error);
    return { data: null };
  }
};
const ModelPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data } = await getModel(id);
  console.log('model data: ', data);
  const model = data[0];
  console.log('model: ', model);
  return model ? (
    <div>
      <h2>{model.modelName}</h2>
      <DriveDbSlider carouselTitle={`Images`} key="images" data={model.driveFiles} type="image" />
      <DriveDbSlider carouselTitle={`Videos`} key="videos" data={model.driveFiles} type="video" />
    </div>
  ) : (
    <div>No model found</div>
  );
};
export default ModelPage;
