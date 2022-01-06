import {
  View,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text
} from "react-native";
import Carousel from "react-native-anchor-carousel";
import citiesActions from "../redux/actions/citiesActions";
import { useEffect, useRef } from "react";
import { connect } from "react-redux";

const CarouselComp = (props) => {
  let carouselRef = useRef();

  useEffect(() => {
    props.fetchCities();
  }, []);

  const items = [
    {
      src: 'https://mytinerary-serato.herokuapp.com/static/media/barcelona.74bedf6a.jpg',
      title: "Barcelona",
    },
    {
      src: 'https://mytinerary-serato.herokuapp.com/static/media/rome.be899a96.jpg',
      title: "Rome",
    },
    {
      src: 'https://mytinerary-serato.herokuapp.com/static/media/istanbul.5565e9f0.jpg',
      title: "Istanbul",
    },
    {
      src:'https://mytinerary-serato.herokuapp.com/static/media/london.477c827a.jpg',
      title: "London",
    },
    {
      src: 'https://mytinerary-serato.herokuapp.com/static/media/milan.ab0e39d5.jpeg',
      title: "Milan",
    },
    {
      src: 'https://mytinerary-serato.herokuapp.com/static/media/paris.96ca9ce9.jpg',
      title: "Paris",
    },
    {
      src: 'https://mytinerary-serato.herokuapp.com/static/media/buenosaires.c751e05a.jpg',
      title: "Buenos aires",
    },
    {
      src: 'https://mytinerary-serato.herokuapp.com/static/media/macchupicchu.ea1cafdc.jpg',
      title: "Macchu picchu",
    },
    {
      src: 'https://mytinerary-serato.herokuapp.com/static/media/toulouse.c7cac819.jpg',
      title: "Toulouse",
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}
      >
        <ImageBackground
          resizeMethod={"auto"}
          key={index}
          style={styles.slide}
          source={{uri:`${item.src}`}}
        >
          <Text style={styles.title}>{item.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <Carousel
          ref={carouselRef}
          data={items}
          renderItem={renderItem}
          style={styles.carousel}
          itemWidth={300}
          containerWidth={400}
          separatorWidth={0}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    cities: state.citiesReducer.cities,
  };
};

const mapDispatchToProps = {
  fetchCities: citiesActions.fetchCities,
};
export default connect(mapStateToProps, mapDispatchToProps)(CarouselComp);
const styles = StyleSheet.create({
  title: {
    fontSize: 10,
    color: "white",
    backgroundColor: "#rgba(0,0,0,0.4)",
    width: "100%",
    textAlign: "center",
    paddingVertical: 10,
  },
  carousel: {
    flexGrow: 0,
    height: 200,
  },
  slide: {
    width: 200,
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 20,
    color: "white",
    backgroundColor: "#rgba(0,0,0,0.4)",
    width: "100%",
    textAlign: "center",
    paddingVertical: 1,
  },
});
