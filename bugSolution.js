```javascript
// Solution using $ifNull to handle empty arrays
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
    $addFields: {
      purchasedProducts: {
        $ifNull: [ "$purchasedProducts", [] ]
      }
    }
  },
  {
    $unwind: {
      path: "$purchasedProducts",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $group:
      {
        _id: "$_id",
        totalSpent: {
          $sum: {
            $ifNull: ["$purchasedProducts.price", 0]
          }
        }
      }
  }
])
```