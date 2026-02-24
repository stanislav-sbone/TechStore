import type { FC } from 'react';
import type { Product } from '@/types/product';
import { Carousel, IconButton, Image } from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import useIsMobile from '@/hooks/useIsMobile';
import styles from './Gallery.module.css';

interface GalleryProps {
  product: Product;
}

const Gallery: FC<GalleryProps> = ({ product }) => {
  const isMobile = useIsMobile(600);

  return (
    <div className={styles.gallery}>
      <Carousel.Root slideCount={product.images.length} maxW="2xl" gap="3">
        <Carousel.Control justifyContent="center" gap="2" width="full">
          {!isMobile && (
            <Carousel.PrevTrigger asChild>
              <IconButton size="lg" variant="outline">
                <LuChevronLeft />
              </IconButton>
            </Carousel.PrevTrigger>
          )}

          <Carousel.ItemGroup width="full">
            {product.images.map((src, index) => (
              <Carousel.Item key={index} index={index}>
                <Image
                  src={src}
                  alt={`${product.title} - изображение ${index + 1}`}
                  objectFit="contain"
                  className={styles.image}
                />
              </Carousel.Item>
            ))}
          </Carousel.ItemGroup>

          {!isMobile && (
            <Carousel.NextTrigger asChild>
              <IconButton size="lg" variant="outline">
                <LuChevronRight />
              </IconButton>
            </Carousel.NextTrigger>
          )}
        </Carousel.Control>

        <Carousel.IndicatorGroup>
          {product.images.map((src, index) => (
            <Carousel.Indicator
              key={index}
              index={index}
              unstyled
              _current={{
                transform: 'scale(1.35)',
                outline: '1px solid gray',
              }}
            >
              <Image
                w="40"
                aspectRatio="16/9"
                src={src}
                alt={`${product.title} - изображение ${index + 1}`}
                objectFit="contain"
              />
            </Carousel.Indicator>
          ))}
        </Carousel.IndicatorGroup>
      </Carousel.Root>
    </div>
  );
};

export default Gallery;
