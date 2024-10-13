import { cn } from '@/lib/utils';
import { DataObject, Image } from '@/utils/types';

type Props = {
  activeImage: Image;
  pages: DataObject['pages'];
  isFetching: boolean;
  handleNext: () => void;
  handlePrevious: () => void;
  className?: string;
};

const pxToRem = (pixel: number) => pixel / 16;

export const ComicImages = ({
  activeImage,
  pages,
  isFetching,
  handleNext,
  handlePrevious,
  className = '',
}: Props) => {
  return (
    <div
      className={cn('relative aspect-[10/14]', className)}
      style={{
        maxHeight: `${pxToRem(activeImage.height)}rem`,
        maxWidth: `${pxToRem(activeImage.width)}rem`,
      }}
    >
      <button
        className="w-1/3 h-full bg-transparent absolute top-0 left-0 z-10"
        aria-label="next page"
        disabled={isFetching}
        onClick={handleNext}
      />
      <button
        className="w-1/3 h-full bg-transparent absolute top-0 right-0 z-10"
        aria-label="previous page"
        disabled={isFetching}
        onClick={handlePrevious}
      />
      {pages.map(({ image }) => {
        return (
          <img
            key={image.id}
            src={image.file}
            className={cn(
              'absolute top-0 left-0 z-0 invisible w-full h-full object-cover',
              {
                visible: activeImage.id === image.id,
              }
            )}
          />
        );
      })}
    </div>
  );
};
