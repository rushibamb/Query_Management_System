import Query from '../models/Query.js';

// @desc    Get all active, non-deleted queries with search, filters, pagination
// @route   GET /api/queries
// @access  Public
export const getQueries = async (req, res) => {
  try {
    const filter = { isDeleted: false };

    // Search query matches customerName, customerEmail, or subject
    if (req.query.search) {
      const escapedSearch = req.query.search.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const searchRegex = new RegExp(escapedSearch, 'i');
      filter.$or = [
        { customerName: searchRegex },
        { customerEmail: searchRegex },
        { subject: searchRegex }
      ];
    }

    // Direct match filters
    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.priority) {
      filter.priority = req.query.priority;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Offset-based pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const total = await Query.countDocuments(filter);
    const data = await Query.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      },
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve queries',
      error: error.message
    });
  }
};

// @desc    Get a single query by ID (must not be soft-deleted)
// @route   GET /api/queries/:id
// @access  Public
export const getQueryById = async (req, res) => {
  try {
    const query = await Query.findOne({ _id: req.params.id, isDeleted: false })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found or has been deleted'
      });
    }

    res.status(200).json({
      success: true,
      data: query
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve query details',
      error: error.message
    });
  }
};

// @desc    Create a new query
// @route   POST /api/queries
// @access  Public
export const createQuery = async (req, res) => {
  try {
    const { customerName, customerEmail, subject, description, category, priority, status } = req.body;

    // Inline validations
    if (!customerName || !customerName.trim()) {
      return res.status(400).json({ success: false, message: 'Customer name is required' });
    }
    if (customerName.trim().length > 100) {
      return res.status(400).json({ success: false, message: 'Customer name cannot exceed 100 characters' });
    }

    if (!customerEmail || !customerEmail.trim()) {
      return res.status(400).json({ success: false, message: 'Customer email is required' });
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(customerEmail.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    if (!subject || !subject.trim()) {
      return res.status(400).json({ success: false, message: 'Subject is required' });
    }
    if (subject.trim().length > 150) {
      return res.status(400).json({ success: false, message: 'Subject cannot exceed 150 characters' });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({ success: false, message: 'Description is required' });
    }
    if (description.trim().length > 2000) {
      return res.status(400).json({ success: false, message: 'Description cannot exceed 2000 characters' });
    }

    // Enum validation checks
    const validCategories = ['Technical', 'Billing', 'Account', 'General'];
    if (category && !validCategories.includes(category)) {
      return res.status(400).json({ success: false, message: `Category must be one of: ${validCategories.join(', ')}` });
    }

    const validPriorities = ['Low', 'Medium', 'High'];
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({ success: false, message: `Priority must be one of: ${validPriorities.join(', ')}` });
    }

    const validStatuses = ['Open', 'In Progress', 'Resolved'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Status must be one of: ${validStatuses.join(', ')}` });
    }

    const newQuery = await Query.create({
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      subject: subject.trim(),
      description: description.trim(),
      category: category || 'General',
      priority: priority || 'Medium',
      status: status || 'Open',
      createdBy: req.admin ? req.admin.id : undefined,
      updatedBy: req.admin ? req.admin.id : undefined
    });

    res.status(201).json({
      success: true,
      message: 'Query created successfully',
      data: newQuery
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create query',
      error: error.message
    });
  }
};

// @desc    Update a query by ID
// @route   PUT /api/queries/:id
// @access  Public
export const updateQuery = async (req, res) => {
  try {
    const { customerName, customerEmail, subject, description, category, priority, status } = req.body;

    // Check if query exists and is active
    let query = await Query.findOne({ _id: req.params.id, isDeleted: false });
    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found or has been deleted'
      });
    }

    // Inline validations on update data if fields are provided
    if (customerName !== undefined) {
      if (!customerName || !customerName.trim()) {
        return res.status(400).json({ success: false, message: 'Customer name cannot be empty' });
      }
      if (customerName.trim().length > 100) {
        return res.status(400).json({ success: false, message: 'Customer name cannot exceed 100 characters' });
      }
      query.customerName = customerName.trim();
    }

    if (customerEmail !== undefined) {
      if (!customerEmail || !customerEmail.trim()) {
        return res.status(400).json({ success: false, message: 'Customer email cannot be empty' });
      }
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(customerEmail.trim())) {
        return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
      }
      query.customerEmail = customerEmail.trim().toLowerCase();
    }

    if (subject !== undefined) {
      if (!subject || !subject.trim()) {
        return res.status(400).json({ success: false, message: 'Subject cannot be empty' });
      }
      if (subject.trim().length > 150) {
        return res.status(400).json({ success: false, message: 'Subject cannot exceed 150 characters' });
      }
      query.subject = subject.trim();
    }

    if (description !== undefined) {
      if (!description || !description.trim()) {
        return res.status(400).json({ success: false, message: 'Description cannot be empty' });
      }
      if (description.trim().length > 2000) {
        return res.status(400).json({ success: false, message: 'Description cannot exceed 2000 characters' });
      }
      query.description = description.trim();
    }

    if (category !== undefined) {
      const validCategories = ['Technical', 'Billing', 'Account', 'General'];
      if (!validCategories.includes(category)) {
        return res.status(400).json({ success: false, message: `Category must be one of: ${validCategories.join(', ')}` });
      }
      query.category = category;
    }

    if (priority !== undefined) {
      const validPriorities = ['Low', 'Medium', 'High'];
      if (!validPriorities.includes(priority)) {
        return res.status(400).json({ success: false, message: `Priority must be one of: ${validPriorities.join(', ')}` });
      }
      query.priority = priority;
    }

    if (status !== undefined) {
      const validStatuses = ['Open', 'In Progress', 'Resolved'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: `Status must be one of: ${validStatuses.join(', ')}` });
      }
      query.status = status;
    }

    query.updatedBy = req.admin.id;
    const updatedQuery = await query.save();

    res.status(200).json({
      success: true,
      message: 'Query updated successfully',
      data: updatedQuery
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update query',
      error: error.message
    });
  }
};

// @desc    Soft delete a query by setting isDeleted to true
// @route   DELETE /api/queries/:id
// @access  Public
export const deleteQuery = async (req, res) => {
  try {
    const query = await Query.findOne({ _id: req.params.id, isDeleted: false });

    if (!query) {
      return res.status(404).json({
        success: false,
        message: 'Query not found or already deleted'
      });
    }

    query.isDeleted = true;
    query.updatedBy = req.admin.id;
    await query.save();

    res.status(200).json({
      success: true,
      message: 'Query has been deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete query',
      error: error.message
    });
  }
};
