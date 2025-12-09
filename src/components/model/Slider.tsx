'use client';
import Image from 'next/image';
import Link from 'next/link';
import { getImageLink } from '../../utils';
import { Slider } from '../Slider';

export const DriveDbSlider = ({
  data,
  carouselTitle,
  type
}: {
  data: any[];
  carouselTitle: string;
  type: 'image' | 'video';
}) => {
  return (
    <Slider carouselTitle={carouselTitle} sizes={{ md: 1, lg: 1 }}>
      {data
        .filter(drive => drive.type === type)
        .map(drive => (
          <div key={drive.driveId}>
            <Link target="_blank" rel="noreferrer nofollower" href={`/drive-db/${drive.driveId}`}>
              <Image
                src={getImageLink(drive.thumbnailLink, 's2400', 's220')}
                referrerPolicy="no-referrer"
                loading="lazy"
                title={`${drive.name}`}
                alt={`${drive.name} - Thumbnail`}
                width={1200}
                height={1200 * (9 / 16)}
                placeholder="blur"
                blurDataURL="/images/video_placeholder_165x103.svg"
              />
            </Link>
            <h3>{drive.name}</h3>
          </div>
        ))}
    </Slider>
  );
};
