```javascript
// Assuming you have a MongoDB collection named 'users'

db.users.aggregate([
  {
    $lookup:
      {
        from: "products",
        localField: "productIds",
        foreignField: "_id",
        as: "purchasedProducts"
      }
  },
  {
    $unwind: "$purchasedProducts" //This will cause an error if a user has no purchased products
  },
  {
    $group:
      {
        _id: "$_id",
        totalSpent: {
          $sum: "$purchasedProducts.price"
        }
      }
  }
])
```