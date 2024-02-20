import React from 'react';
import { ArrowBackSharp } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import NavBarContainer from '../../components/NavBarContainer';

export default function PrivacyPolicy() {
    const router = useRouter();

    return (
        <>
            <Stack alignItems='center' justifyContent='space-between' direction='column' width={1} height={1}>
                <NavBarContainer sx={{ width: '100%', position: 'sticky', borderBottom: 'divider' }}>
                    <Stack direction='row' justifyContent='flex-start' alignItems='center' flexWrap='nowrap' width={1}>
                        <IconButton
                            onClick={() => {
                                router.back();
                            }}
                        >
                            <ArrowBackSharp />
                        </IconButton>
                    </Stack>
                </NavBarContainer>

                <Stack
                    sx={{
                        md: { width: '50%' },
                        lg: { width: '50%' },
                        xl: { width: '50%' },
                        sm: { width: '90%' },
                        xs: { width: '90%' },
                        overflowY: 'scroll',
                    }}
                    justifyContent='flex-start'
                    direction='column'
                    alignItems='center'
                    padding={2}
                    spacing={2}
                    position='relative'
                    zIndex={100}
                    flex={1}
                >
                    <Stack direction='column'>
                        <Typography variant='h4'>Privacy Policy for Pronto Portal</Typography>
                        <Typography variant='subtitle1'>Effective Date: February 16, 2024</Typography>
                    </Stack>
                    <Typography>
                        Cipher Codex LLC (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy of the users
                        (&quot;user,&quot; &quot;you,&quot; or &quot;your&quot;) of Pronto Portal (&quot;App&quot;). This Privacy Policy explains how we
                        collect, use, disclose, and safeguard your information when you use our App. We use Google OAuth for authentication, Twilio for sending
                        SMS reminders, and Stripe for processing subscription payments as part of our services. Please read this privacy policy carefully. If
                        you do not agree with the terms of this privacy policy, please do not access the App.
                    </Typography>

                    <Divider flexItem />
                    <Stack direction='column'>
                        <Typography variant='h5'>Collection of Your Information</Typography>

                        <Typography>We may collect information about you in various ways. The information we may collect via the App includes:</Typography>
                        <List>
                            <ListItem>
                                <Typography>
                                    <b>Personal Data:</b> Personal identification information, such as your name, email address, phone number, languages you
                                    speak, and current city/state, that you voluntarily give to us when you choose to use our App. This includes information
                                    required to verify your identity, provide our services, and customize your experience.
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>
                                    <b>Derivative Data:</b> Information our servers automatically collect when you access the App, such as your IP address,
                                    device type, browser type, and operating system.
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>
                                    <b>Financial Data:</b> Financial information, such as data related to your payment method (e.g., valid credit card number,
                                    card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about
                                    our services from the App. We store only very limited, if any, financial information that we collect. Otherwise, all
                                    financial information is stored by our payment processor, Stripe, and you are encouraged to review their privacy policy and
                                    contact them directly for responses to your questions.
                                </Typography>
                            </ListItem>
                        </List>
                    </Stack>

                    <Divider flexItem />

                    <Stack direction='column'>
                        <Typography variant='h5'>Use of Your Information</Typography>
                        <Typography>
                            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically,
                            we may use information collected about you via the App to:
                        </Typography>
                        <List>
                            <ListItem>
                                <Typography>Create and manage your account.</Typography>
                            </ListItem>

                            <ListItem>
                                <Typography>Process your payments and manage subscriptions.</Typography>
                            </ListItem>

                            <ListItem>
                                <Typography>Send you SMS reminders through Twilio.</Typography>
                            </ListItem>

                            <ListItem>
                                <Typography>Enable user-to-user communications.</Typography>
                            </ListItem>

                            <ListItem>
                                <Typography>Increase the efficiency and operation of the App.</Typography>
                            </ListItem>

                            <ListItem>
                                <Typography>Monitor and analyze usage and trends to improve your experience with the App.</Typography>
                            </ListItem>

                            <ListItem>
                                <Typography>Notify you of updates to the App.</Typography>
                            </ListItem>

                            <ListItem>
                                <Typography>Offer new products, services, and/or recommendations to you.</Typography>
                            </ListItem>

                            <ListItem>
                                <Typography>Perform other business activities as needed.</Typography>
                            </ListItem>

                            <ListItem>
                                <Typography>Request feedback and contact you about your use of the App.</Typography>
                            </ListItem>

                            <ListItem>
                                <Typography>Disclosure of Your Information.</Typography>
                            </ListItem>
                        </List>
                    </Stack>

                    <Divider flexItem />
                    <Stack>
                        <Typography variant='h5'>
                            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                        </Typography>

                        <List>
                            <ListItem>
                                <Typography>By Law or to Protect Rights</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>Third-Party Service Providers</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>Marketing Communications</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>Interactions with Other Users</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>Third-Party Service Providers</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>Third-Party Advertisers</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>Business Transfers</Typography>
                            </ListItem>
                            <ListItem>
                                <Typography>Google OAuth</Typography>
                            </ListItem>
                        </List>
                    </Stack>

                    <Stack>
                        <Typography variant='h5'>Security of Your Information</Typography>
                        <Typography>
                            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken
                            reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security
                            measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of
                            misuse. Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot
                            guarantee complete security if you provide personal information.
                        </Typography>
                    </Stack>

                    <Divider flexItem />
                    <Typography>
                        We use Google OAuth for authentication. When you log in through Google, we do not request or have access to your Google account details,
                        except for the information needed to create and manage your account in our App, such as your email address.
                    </Typography>
                    <Divider flexItem />

                    <Stack>
                        <Typography>
                            <b>Twilio</b>
                        </Typography>
                        <Typography>
                            We use Twilio for sending SMS reminders. Your phone number and SMS content are shared with Twilio for the purpose of delivering the
                            reminder messages. Please review Twilio’s privacy policy for more information on how they manage your data.
                        </Typography>
                    </Stack>

                    <Stack>
                        <Typography>
                            <b>Stripe</b>
                        </Typography>
                        <Typography>
                            We use Stripe for processing subscription payments. Your payment information is shared with Stripe for the purpose of processing
                            your subscription payments securely. Please review Stripe’s privacy policy for more information on how they manage and protect your
                            financial data.
                        </Typography>
                    </Stack>

                    <Stack>
                        <Typography>
                            <b>Your Rights</b>
                        </Typography>
                        <Typography>
                            You have the right to request access to the personal information we collect from you, change that information, or delete it in some
                            circumstances. To request to review, update, or delete your personal information, please submit a request to brandonberke@gmail.com
                        </Typography>
                    </Stack>

                    <Stack>
                        <Typography>
                            <b>Updates to This Policy</b>
                        </Typography>
                        <Typography>
                            We may update this privacy policy from time to time. The updated version will be indicated by an updated &quot;Effective Date&quot;
                            and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy policy frequently to
                            be informed of how we are protecting your information.
                        </Typography>
                    </Stack>

                    <Stack>
                        <Typography>
                            <b>Contact Us</b>
                        </Typography>
                        <Typography>If you have questions or comments about this privacy policy, please contact us at: brandonberke@gmail.com</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
}
