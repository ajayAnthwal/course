import Lead from "../../lead/model/lead.model";
import College from "../../college/model/college.model";
import User from "../../user/model/user.model";
import Payment from "../../payment/model/order.model";

interface DateRange {
  startDate?: string;
  endDate?: string;
}

class AnalyticsService {
  async getDashboardStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const [
      totalUsers,
      totalColleges,
      totalLeads,
      convertedLeads,
      pendingLeads,
      contactedLeads,
      interestedLeads,
      newLeadsThisMonth,
      totalPaymentRevenue,
      successfulPayments,
      pendingPayments,
      collegeByType,
      leadsByMonth,
      recentLeads,
    ] = await Promise.all([
      User.countDocuments({ isActive: true }),
      College.countDocuments({ isActive: true }),
      Lead.countDocuments(),
      Lead.countDocuments({ status: "admitted" }),
      Lead.countDocuments({ status: "new" }),
      Lead.countDocuments({ status: "contacted" }),
      Lead.countDocuments({ status: "interested" }),
      Lead.countDocuments({ createdAt: { $gte: last30Days } }),
      Payment.aggregate([
        { $match: { status: "captured" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      Payment.countDocuments({ status: "captured" }),
      Payment.countDocuments({ status: "created" }),
      College.aggregate([
        { $group: { _id: "$type", count: { $sum: 1 } } },
      ]),
      Lead.aggregate([
        { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
        { $limit: 12 },
      ]),
      Lead.find().sort({ createdAt: -1 }).limit(10),
    ]);

    const revenue = totalPaymentRevenue[0]?.total || 0;

    const leadsOverTime = leadsByMonth.map((item: any) => ({
      name: new Date(0, item._id - 1).toLocaleString("default", { month: "short" }),
      value: item.count,
    }));

    const collegeDistribution = collegeByType.map((item: any) => ({
      name: item._id?.charAt(0).toUpperCase() + item._id?.slice(1) || "Unknown",
      value: item.count,
      color: item._id === "government" ? "#10b981" : item._id === "private" ? "#6366f1" : item._id === "deemed" ? "#f59e0b" : "#ec4899",
    }));

    const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;
    const leadsGrowth = newLeadsThisMonth > 0 ? Math.round((newLeadsThisMonth / (totalLeads || 1)) * 100) : 0;

    return {
      users: { total: totalUsers },
      colleges: { total: totalColleges },
      leads: {
        total: totalLeads,
        new: pendingLeads,
        contacted: contactedLeads,
        interested: interestedLeads,
        admitted: convertedLeads,
        conversionRate,
      },
      revenue: {
        total: revenue,
        successful: successfulPayments,
        pending: pendingPayments,
      },
      charts: {
        leadsOverTime,
        collegeDistribution,
      },
      recentLeads: recentLeads.map((lead: any) => ({
        _id: lead._id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        course: lead.course,
        status: lead.status,
        createdAt: lead.createdAt,
      })),
    };
  }

  async getRevenueStats(dateRange?: DateRange) {
    const filter: any = { status: "captured" };
    
    if (dateRange?.startDate) {
      filter.createdAt = { ...filter.createdAt, $gte: new Date(dateRange.startDate) };
    }
    if (dateRange?.endDate) {
      filter.createdAt = { ...filter.createdAt, $lte: new Date(dateRange.endDate) };
    }

    const result = await Payment.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 12 },
    ]);

    return result.map((item: any) => ({
      name: `${item._id.month}/${item._id.year}`,
      value: item.total,
      count: item.count,
    }));
  }

  async getLeadAnalytics(dateRange?: DateRange) {
    const filter: any = {};
    
    if (dateRange?.startDate || dateRange?.endDate) {
      filter.createdAt = {};
      if (dateRange.startDate) filter.createdAt.$gte = new Date(dateRange.startDate);
      if (dateRange.endDate) filter.createdAt.$lte = new Date(dateRange.endDate);
    }

    const [byStatus, bySource, byCollege] = await Promise.all([
      Lead.aggregate([
        { $match: filter },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      Lead.aggregate([
        { $match: filter },
        { $group: { _id: "$source", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      Lead.aggregate([
        { $match: { ...filter, college: { $ne: null } } },
        { $group: { _id: "$college", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
    ]);

    return {
      byStatus: byStatus.map((s: any) => ({ status: s._id, count: s.count })),
      bySource: bySource.map((s: any) => ({ source: s._id, count: s.count })),
      byCollege: byCollege,
    };
  }

  async getCollegePerformance() {
    const colleges = await College.find({ isActive: true })
      .sort({ rating: -1 })
      .limit(10)
      .select("name location.rating ranking reviewCount");

    return colleges;
  }
}

export default new AnalyticsService();