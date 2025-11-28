import { Suspense } from 'react';
import handleResponse from '../../../src/utils/handleResponse';
import { DriveFileView } from '../../../src/components/FileEditor';

const getDriveFile = async (driveId: string) => {
  try {
    const response = await handleResponse(
      await fetch(`${process.env.INTERNAL_API_URL}/api/drive-file/${driveId}`, { credentials: 'include' })
    );
    return response;
  } catch (error) {
    console.error('DriveFile error: ', error);
    return { data: null };
  }
};

const DriveFile = async ({ params }: PageProps<'/drive/[driveId]'>) => {
  const { driveId } = await params;
  const { data } = await getDriveFile(driveId);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DriveFileView file={data} />
    </Suspense>
  );
};

export default DriveFile;
