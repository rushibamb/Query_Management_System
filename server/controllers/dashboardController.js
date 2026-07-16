import Query from '../models/Query.js';

// @desc    Get dashboard metrics and recent queries
// @route   GET /api/dashboard
// @access  Public
export const getDashboardStats = async (req, res) => {
  try {
    const activeFilter = { isDeleted: false };

    // Run stats aggregation pipeline and fetch recent tickets concurrently
    const [statsResult, recentQueries] = await Promise.all([
      Query.aggregate([
        { $match: activeFilter },
        {
          $group: {
            _id: null,
            totalQueries: { $sum: 1 },
            openQueries: { $sum: { $cond: [{ $eq: ['$status', 'Open'] }, 1, 0] } },
            inProgressQueries: { $sum: { $cond: [{ $eq: ['$status', 'In Progress'] }, 1, 0] } },
            resolvedQueries: { $sum: { $cond: [{ $eq: ['$status', 'Resolved'] }, 1, 0] } },
            highPriorityQueries: { $sum: { $cond: [{ $eq: ['$priority', 'High'] }, 1, 0] } }
          }
        }
      ]),
      Query.find(activeFilter).sort({ createdAt: -1 }).limit(10)
    ]);

    const stats = statsResult[0] || {
      totalQueries: 0,
      openQueries: 0,
      inProgressQueries: 0,
      resolvedQueries: 0,
      highPriorityQueries: 0
    };

    res.status(200).json({
      success: true,
      data: {
        totalQueries: stats.totalQueries,
        openQueries: stats.openQueries,
        inProgressQueries: stats.inProgressQueries,
        resolvedQueries: stats.resolvedQueries,
        highPriorityQueries: stats.highPriorityQueries,
        recentQueries
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard statistics',
      error: error.message
    });
  }
};
