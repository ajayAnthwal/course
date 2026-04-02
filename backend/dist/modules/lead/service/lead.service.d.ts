import { ILead } from "../model/lead.model";
interface GetLeadsQuery {
    page?: string;
    limit?: string;
    status?: string;
    college?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
declare class LeadService {
    getAllLeads(query: GetLeadsQuery, userId?: string, userRole?: string): Promise<{
        leads: (import("mongoose").Document<unknown, {}, ILead, {}, {}> & ILead & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getLeadById(id: string): Promise<ILead>;
    createLead(data: Partial<ILead>, userId?: string): Promise<ILead>;
    updateLead(id: string, data: Partial<ILead>): Promise<ILead>;
    deleteLead(id: string): Promise<void>;
    getLeadStats(): Promise<{
        total: number;
        new: number;
        contacted: number;
        interested: number;
        admitted: number;
    }>;
    private getCollegeName;
    private sendLeadConfirmationSms;
    private sendStatusUpdateSms;
}
declare const _default: LeadService;
export default _default;
//# sourceMappingURL=lead.service.d.ts.map