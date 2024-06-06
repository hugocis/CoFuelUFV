const supabase = require('../models/supabaseClient');

// Function to send a friend request
const sendFriendRequest = async (req, res) => {
  const { userId, friendId } = req.body;
  console.log('sendFriendRequest endpoint hit');
  console.log('Request body:', req.body);

  try {
    const { data, error } = await supabase
      .from('friends')
      .insert([{ user_id: userId, friend_id: friendId, status: 'pending' }]);
    
    if (error) {
      throw error;
    }

    console.log('Friend request sent:', data);
    res.status(201).send(data);
  } catch (error) {
    console.error('Error sending friend request:', error.message);
    res.status(400).send(error.message);
  }
};

// Function to respond to a friend request
const respondFriendRequest = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  console.log('respondFriendRequest endpoint hit');
  console.log('Request params:', req.params);
  console.log('Request body:', req.body);

  try {
    const { data, error } = await supabase
      .from('friends')
      .update({ status })
      .eq('id', id);

    if (error) {
      throw error;
    }

    console.log('Friend request response:', data);
    res.status(200).send(data);
  } catch (error) {
    console.error('Error responding to friend request:', error.message);
    res.status(400).send(error.message);
  }
};

// Function to list friends
const listFriends = async (req, res) => {
  const { userId } = req.params;
  console.log('listFriends endpoint hit');
  console.log('Request params:', req.params);

  try {
    const { data, error } = await supabase
      .from('friends')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'accepted');

    if (error) {
      throw error;
    }

    console.log('List of friends:', data);
    res.status(200).send(data);
  } catch (error) {
    console.error('Error listing friends:', error.message);
    res.status(400).send(error.message);
  }
};

module.exports = {
  sendFriendRequest,
  respondFriendRequest,
  listFriends
};
