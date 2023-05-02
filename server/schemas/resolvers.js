const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order, KitOrder } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_51MWsBqFedoDMRamP0TF1Y5rEZOXhhy9hawaQUUvPRpdJ7X5JhpvWf4h0JUiKPvxBhMQl6mhqQOq6zhMUKadUwc4400vP8UALH5');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    //
    users: async () => {
      const user = await User.find();
      //console.log(user);
      console.log(user.length);

      console.log(user);
      return user;
    },
    //
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    kitchenOrder: async () => {
      const kitchenOrder = await KitOrder.find().populate('products');
      //console.log(user);
      console.log("kitchen order query at resolver");

      console.log(kitchenOrder);
      return kitchenOrder;
    },

    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];
      console.log(context.user.email);
      console.log("checkout is Over!!!!!!: ");
      const email = context.user.email;
      
      console.log(email);
      const { products } = await order.populate('products');

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      console.log("session is Over!!!!!!: ");
      //console.log(session);
      return { session: session.id };
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      console.log("addUser at resolver right now: ");
      return { token, user };
    },
    addKitchenOrder: async (parent, args) => {
      
      const kitchenOrder = await KitOrder.create(args);
      console.log("ADD KITCHEN ORDER at resolver right now: ");
      return kitchenOrder;
    },
    
    updateKitchenOrder: async (parent, { _id }) => {
      
      const kitorder = await KitOrder.findById(_id);
      var status = kitorder.status;

      console.log(status);
      
      
      switch (status) {
        case "Pending":
          status = "Prepping";
          break;
        case "Prepping":
          status = "Serving";
          break;
        case "Serving":
          status = "Delivered";
          break;
        default:
          status = "Pending";
      }

      
      return await KitOrder.findByIdAndUpdate(_id, { status: status }, { new: true });
    },
    deleteKitchenOrders: async (parent, { ids }) => {
     
      const all = await KitOrder.deleteMany(ids);
     
      console.log("DELETE KITCHEN ORDER at resolver right now: ");

      return all;
    },


    addOrder: async (parent, { products }, context) => {
      console.log("addOrder is Over!!!!!!: ");
      console.log(context.user);
      if (context.user) {
        const order = new Order({ products });
        console.log("*** order  *****");
        console.log(order);
        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
        
              
        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    



    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateEmployee: async (parent, _id, context) => {
      if (context.user) {
        const user = await User.findById(_id);
      var employee = user.employee;
        if (employee == "true") {
          employee = "false";
        } else {
          employee = "true";
        }
      console.log(employee);
        return await User.findByIdAndUpdate(_id, { employee: employee });
      }

      throw new AuthenticationError('Not logged in');

    },
        
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * +1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(user.employee);


      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
