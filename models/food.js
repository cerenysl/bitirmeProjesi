class Food {
    constructor(
      id,
      PlaceIds,
      title,
      affordability,
      complexity,
      imageUrl,
    ) {
      this.id = id;
      this.PlaceIds = PlaceIds;
      this.complexity = complexity;
      this.affordability = affordability;
      this.title = title;
      this.imageUrl = imageUrl;
    }
  }
  
  export default Food;
  