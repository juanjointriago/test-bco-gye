import { Carousel } from "@mantine/carousel";
import { Box, Image } from "@mantine/core";

export const PreviewImages = ({ imagesPreview, mediaMd }: { imagesPreview: string[], mediaMd?: boolean }) => {


  return (
    <Carousel
      maw={'100%'}
      slideSize="100%"
      height={'100%'}
      slideGap="xl"
      loop
      mt={20}
      mx={'auto'}
    >
      {
        imagesPreview.map(image => (
          <Carousel.Slide
            key={image}
          >
            <Box
              sx={(theme) => ({
                display: mediaMd ? 'none' : 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                widht: 500,
                [theme.fn.smallerThan('md')]: {
                  display: mediaMd ? 'flex' : 'none',
                },
              })}
            >
              <Image
                width={500}
                height={400}
                src={image}
                alt={'image'}
                radius={10}
                sx={(theme) => ({
                  [theme.fn.smallerThan('md')]: {
                    width: 'auto !important',
                  },
                  width: '500px !important',
                })}
                styles={(theme) => ({
                  image: {
                    [theme.fn.smallerThan('sm')]: {
                      width: '90% !important',
                      margin: '0 auto',
                    },
                    // width: '500px !important',
                    // height: '500px !important',
                    // objectFit: 'contain !important',
                  }
                })}
              />
            </Box>
          </Carousel.Slide>
        ))
      }
    </Carousel>
  )
};
