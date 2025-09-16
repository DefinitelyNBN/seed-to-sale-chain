import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/db";

const distributorSchema = z.object({
  farmerName: z.string().min(2, "Farmer name is required"),
  quantity: z
    .string()
    .refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, "Enter a valid quantity"),
  fertilizerAmount: z
    .string()
    .refine((val) => !Number.isNaN(Number(val)) && Number(val) >= 0, "Enter a valid amount"),
  address: z.string().min(5, "Address is required"),
  pincode: z
    .string()
    .regex(/^\d{5,6}$/,
      "Enter a valid 5-6 digit postal code"),
});

export type DistributorFormValues = z.infer<typeof distributorSchema>;

const defaultValues: DistributorFormValues = {
  farmerName: "",
  quantity: "",
  fertilizerAmount: "",
  address: "",
  pincode: "",
};

export const DistributorForm = () => {
  const { toast } = useToast();

  const form = useForm<DistributorFormValues>({
    resolver: zodResolver(distributorSchema),
    defaultValues,
    mode: "onTouched",
  });

  const onSubmit = async (values: DistributorFormValues) => {
    const summary = {
      farmerName: values.farmerName,
      quantity: Number(values.quantity),
      fertilizerAmount: Number(values.fertilizerAmount),
      address: values.address,
      pincode: values.pincode,
    };

    await db.farmers.add({
      name: summary.farmerName,
      quantity: summary.quantity,
      fertilizerAmount: summary.fertilizerAmount,
      address: summary.address,
      pincode: summary.pincode,
      createdAt: Date.now(),
    });

    toast({
      title: "Distributor entry recorded",
      description: `Farmer: ${summary.farmerName} • Qty: ${summary.quantity} • Fertilizer: ${summary.fertilizerAmount} • PIN: ${summary.pincode}`,
    });

    form.reset(defaultValues);
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="farmerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Farmer Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Ramesh Kumar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input inputMode="numeric" placeholder="e.g., 500 (kg)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fertilizerAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fertilizer Amount</FormLabel>
                <FormControl>
                  <Input inputMode="numeric" placeholder="e.g., 50 (kg)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Farmer Address</FormLabel>
              <FormControl>
                <Textarea placeholder="House, Street, Village/Town, District, State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code (PIN)</FormLabel>
              <FormControl>
                <Input inputMode="numeric" placeholder="e.g., 751001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-3">
          <Button type="submit" variant="blockchain">Save Entry</Button>
          <Button type="button" variant="outline" onClick={() => form.reset(defaultValues)}>Reset</Button>
        </div>
      </form>
    </Form>
  );
};

