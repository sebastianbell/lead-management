import { NextResponse } from "next/server";
import { LeadFormData } from "types/types";
import { v4 as uuidv4 } from "uuid";

let leads: LeadFormData[] = [];

export async function POST(request: Request) {
  try {
    const data: LeadFormData = await request.json();
    console.log("Received lead data:", data);

    const requiredFields: (keyof LeadFormData)[] = [
      "firstName",
      "lastName",
      "email",
      "profile",
      "visas",
    ];
    for (const field of requiredFields) {
      if (
        !data[field] ||
        (Array.isArray(data[field]) && data[field]?.length === 0)
      ) {
        return NextResponse.json(
          { success: false, message: `${field} is required.` },
          { status: 400 }
        );
      }
    }

    const leadWithId = { ...data, id: uuidv4() };
    leads.push(leadWithId);

    return NextResponse.json({ success: true, lead: leadWithId });
  } catch (error) {
    console.error("Error processing lead data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process lead data" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();

    const lead = leads.find((lead) => lead.id === id);
    if (!lead) {
      return NextResponse.json(
        { success: false, message: "Lead not found" },
        { status: 404 }
      );
    }

    lead.status = status;
    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update lead" },
      { status: 500 }
    );
  }
}
