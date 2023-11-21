import useTheme from "../hooks/useTheme";
import {Typography} from "@mui/material";

const WaterfallGrid = ({ items }: any) => {

  const { theme } = useTheme()
  return (
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap -mx-2">
          {items.map((item, index) => (
              <div key={index} className="w-full md:w-1/2 lg:w-1/3 p-2">
                <div className={`bg-[${theme.background.paper}] p-4 rounded-lg shadow-lg h-full`}>
                  <img
                      src={item.image}
                      alt={item.title}
                      className="rounded-lg w-full object-cover"
                      style={{ height: '200px' }}
                  />
                  <div>
                    <Typography variant={'h6'}>
                      {item.title}
                    </Typography>
                    <Typography variant={'subtitle2'} component={'p'} color={'text.secondary'}>{item.description}</Typography>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export const Blog = () => {
  const items = [
    {
      title: "Item 1",
      description: "This is a description for item 1",
      image: "path-to-image-1.jpg",
    },
    {
      title: "Item 2",
      description: "This is a description for item 2This is a description for item 2This is a description for item 2",
      image: "path-to-image-2.jpg",
    },
    {
      title: "Item 2",
      description: "This is a description for item 2This is a description for item 2This is a description for item 2",
      image: "path-to-image-2.jpg",
    },
    {
      title: "Item 1",
      description: "This is a description for item 1",
      image: "path-to-image-1.jpg",
    },
    {
      title: "Item 2",
      description: "This is a description for item 2This is a description for item 2This is a description for item 2",
      image: "path-to-image-2.jpg",
    },
    {
      title: "Item 2",
      description: "This is a description for item 2This is a description for item 2This is a description for item 2",
      image: "path-to-image-2.jpg",
    },
    // ...更多项目
  ];
  return (
      <div>
          <WaterfallGrid items={items}/>
      </div>
  )
}

export default Blog